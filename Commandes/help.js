const Discord = require("discord.js");

module.exports = {
  name: "help",
  description: "Affiche les commandes disponibles.",
  permission: "None",
  context: "None",
  category: "Help",
  options: [
    {
      type: "string",
      name: "cmd",
      description: "La commande à afficher",
      autocomplete: false,
      required: false
    }
  ],

  async run(bot, interaction, args) {
    let cmd;
    if (args.getString("cmd")) {
      cmd = bot.commands.get(args.getString("cmd"));
      if (!cmd)
        return interaction.reply(`Error: \`${args.getString("cmd")}\` is not a command.`);
    }

    let categories = [];
    bot.commands.forEach(command => {
      if (!categories.includes(command.category)) categories.push(command.category);
    })

    let Embed = new Discord.EmbedBuilder()
      .setColor(bot.color)
      .setTitle(`Commands`)
      .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`Available commands: \`${bot.commands.size}\`\nAvailable categories: \`${categories.length}\``)
      .setTimestamp()
      .setFooter({ text: "\`/help\`" });

    categories.sort().forEach(async cat => {
      let commands = bot.commands.filter(cmd => cmd.category === cat);
      Embed.addFields({ name: `${cat}`, value: `${commands.map(cmd => `\`${cmd.name}\`: \`${cmd.description}\``).join("\n")}` });
    });

    await interaction.reply({ embeds: [Embed] });
  }
}
