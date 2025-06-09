import Discord from "discord.js"

export const command = {
  name: "remove-profile",
  description: "Supprimer un profil",
  permission: Discord.PermissionsBitField.Flags.ManageChannels,
  context: Discord.InteractionContextType.Guild,
  category: "Only Managers",
  options: [
    {
      type: "string",
      name: "name",
      description: "nom du profil",
      autocomplete: true,
      required: true,
    }
  ],

  async run(_, interaction, args) {
    let name = args.getString("name");

    if (!name) return interaction.reply("Error: Missing Argument.");
    let category = await interaction.guild.channels.cache.find(
      channel => channel.name === name && channel.type === Discord.ChannelType.GuildCategory);
    if (!category) return interaction.reply(`Error: Category \`${name}\` does not exist.`);

    category.children.cache.map(c => c.id).forEach(id => {
      interaction.guild.channels.cache.get(id).delete();
    });
    category.delete();

    interaction.reply(`Profile \`${name}\` successfully deleted. ✅`);
  }
}
