const cron = require("node-cron");
const channels = require("../share/channels");
const { default: axios } = require("axios");

const bitcoinCronJob = (client) => {
  // Fazendo a requisição com Axios

  console.log("Starting Bitcoin cronjob");

  cron.schedule("0 * * * *", async () => {
    // Esta tarefa é agendada para rodar a cada 1 minuto (*/1)

    const baseUrl =
      "https://data-api.cryptocompare.com/index/cc/v1/historical/minutes";
    const params = {
      market: "cadli",
      instrument: "BTC-BRL",
      limit: 1,
      aggregate: 1,
      fill: "true",
      apply_mapping: "true",
      response_format: "JSON",
      api_key: process.env.CRYPTOCOMPARE_KEY,
    };

    await axios
      .get(baseUrl, { params })
      .then(async (response) => {
        const btc = Number(response.data["Data"][0].OPEN).toFixed(2);
        const formattedBtc = Number(btc).toLocaleString("pt-BR");
        await Promise.all(
          channels.map((channelId) => {
            const channel = client.channels.cache.get(channelId);

            if (channel) channel.send(`📈 Bitcoin = \`R$${formattedBtc}\` `);
          })
        );
      })
      .catch(async (error) => {
        console.log(error);
        await Promise.all(
          channels.map((channelId) => {
            const channel = client.channels.cache.get(channelId);

            if (channel) channel.send("⛔ Falha ao obter cotação do Bitcoin");
          })
        );

        // Enviar mensagem para todos os canais configurados
      });
  });
};

module.exports = bitcoinCronJob;
