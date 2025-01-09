const { SlashCommandBuilder } = require("discord.js");

const test = async (interaction) => {
  console.log("✅ test command");

  await interaction.reply("✅ Teste do meu mano odizinho!");
};

module.exports = {
  data: new SlashCommandBuilder().setName("test").setDescription("test"),
  async execute(interaction) {
    try {
      await test(interaction); // Chama a função de execução do comando
    } catch (error) {
      console.error("Erro ao executar o comando:", error);
      await interaction.reply("Ocorreu um erro ao executar o comando!");
    }
  },
};
