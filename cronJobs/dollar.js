// dollar.js

const { Client } = require("discord.js");
const cron = require("node-cron");
const channels = require("../share/channels");

const dollarCronJob = (client) => {
  console.log("Starting Dollar cronjob");

  cron.schedule("*/1 * * * *", async () => {
    // Esta tarefa é agendada para rodar a cada 1 minuto (*/1)
    console.log("Tarefa agendada: Enviando mensagem no canal...");

    // Enviar mensagem para todos os canais configurados
    await Promise.all(
      channels.map((channelId) => {
        console.log(`Enviando para o canal com ID: ${channelId}`);
        const channel = client.channels.cache.get(channelId);

        if (channel) {
          channel.send("Esta é uma mensagem automática a cada 1 minuto!");
        } else {
          console.log("Não consegui encontrar o canal especificado.");
        }
      })
    );
  });
};

module.exports = dollarCronJob;
