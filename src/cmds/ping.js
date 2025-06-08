const Discord = require("discord.js");

module.exports = {
  name: "ping",
  description: "Affiche la latence",
  permission: "None",
  context: "None",
  category: "Utils",
  options: [],

  async run(_, interaction) {
    await interaction.reply(`Pong: \`${Date.now() - interaction.createdTimestamp}\`ms`);
  }
}
