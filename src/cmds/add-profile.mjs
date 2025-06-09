import Discord from "discord.js"

export const command = {
  name: "add-profile",
  description: "Ajouter une nouvelle catégorie pour un profil.",
  permission: Discord.PermissionsBitField.Flags.ManageChannels,
  context: Discord.InteractionContextType.Guild,
  category: "Only Managers",
  options: [
    {
      type: "string",
      name: "name",
      description: "nom du profil",
      autocomplete: false,
      required: true
    }
  ],

  async run(_, interaction, args) {
    let name = args.getString("name");

    if (!name) return interaction.reply("Error: Missing Argument.");

    let category = await interaction.guild.channels.cache.find(
      channel => channel.name === name && channel.type === Discord.ChannelType.GuildCategory);
    if (category) return interaction.reply(`Error: Category \`${name}\` already exists.`);

    category = await interaction.guild.channels.create({
      name: `${name}`,
      type: Discord.ChannelType.GuildCategory
    });
    category.children.create({
      name: "📷photo-base",
      type: Discord.ChannelType.GuildText, parent: category
    });
    category.children.create({
      name: "💦correction-images",
      type: Discord.ChannelType.GuildText, parent: category
    });
    category.children.create({
      name: "💌prompt-a-garder",
      type: Discord.ChannelType.GuildText, parent: category
    });
    category.children.create({
      name: "🫦insta-publi",
      type: Discord.ChannelType.GuildText, parent: category
    });

    interaction.reply(`Channels for \`${name}\` profile are created. ✅`);
  }
}
