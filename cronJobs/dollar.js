// dollar.js

const { EmbedBuilder } = require("discord.js");
const cron = require("node-cron");
const channels = require("../share/channels");
const { default: axios } = require("axios");

const ExchangeApiUrl = "https://api.exchangerate-api.com/v4/latest/USD";

const dollarCronJob = (client) => {
  console.log("Starting Dollar cronjob");

  cron.schedule("0 * * * *", async () => {
    // Esta tarefa é agendada para rodar a cada 1 minuto (*/1)

    await axios
      .get(ExchangeApiUrl)
      .then(async (response) => {
        const brl = Number(response?.data?.rates.BRL).toFixed(2);

        await Promise.all(
          channels.map((channelId) => {
            const channel = client.channels.cache.get(channelId);

            if (channel) channel.send(`💵 Dólar (USA) = \`R$${brl}\` `);
          })
        );
      })
      .catch(async (error) => {
        console.log(error);
        await Promise.all(
          channels.map((channelId) => {
            const channel = client.channels.cache.get(channelId);

            if (channel) channel.send("⛔ Falha ao obter cotação do dólar");
          })
        );
      });

    // Enviar mensagem para todos os canais configurados
  });
};

module.exports = dollarCronJob;
