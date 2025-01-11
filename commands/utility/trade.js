const { SlashCommandBuilder } = require("discord.js");

const axios = require("axios");
const OpenAI = require("openai");

const openai = new OpenAI({
  organization: process.env.OPENAI_ORGANIZATIONID,
  project: process.env.OPENAI_PROJECTID,
});

const trade = async (interaction) => {
  //Montar array com histórico de dois dias de hora em hora do bitcoin

  const coinHistory = await findCoinHistory("BTC");
  const textCoinHistory = JSON.stringify(coinHistory);

  await interaction.reply("✅ Trade");
};

const findCoinHistory = async (coin) => {
  const baseUrl =
    "https://data-api.cryptocompare.com/index/cc/v1/historical/hours";

  const params = {
    market: "cadli",
    instrument: `${coin}-USD`,
    limit: 48,
    aggregate: 1,
    fill: "true",
    apply_mapping: "true",
    response_format: "JSON",
    api_key: process.env.CRYPTOCOMPARE_KEY,
  };

  try {
    const response = await axios.get(baseUrl, { params });
    const historical = response.data["Data"];

    const formatedHistorical = historical?.map((history) => {
      return {
        date: new Date(history["TIMESTAMP"] * 1000),
        value: history["OPEN"],
      };
    });

    return formatedHistorical;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  data: new SlashCommandBuilder().setName("trade").setDescription("GPT Trade"),
  async execute(interaction) {
    try {
      await trade(interaction); // Chama a função de execução do comando
    } catch (error) {
      console.error("Erro ao executar o comando:", error);
      await interaction.reply("Ocorreu um erro ao executar o comando!");
    }
  },
};
