const Discord = require("discord.js");

module.exports = {
  name: "ping",
  description: "Affiche la latence",
  permission: "None",
  context: "None",
  category: "Utils",
  options: [],

  async run(_, message) {
    await message.reply(`Pong: \`${Date.now() - message.createdTimestamp}\`ms`);
  }
}
