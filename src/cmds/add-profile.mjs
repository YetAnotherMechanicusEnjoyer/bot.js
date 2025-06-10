import Discord from "discord.js"

async function createChannel(n, p) {
  p.children.create({
    name: n,
    type: Discord.ChannelType.GuildText, parent: p
  });
}

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

  async run(bot, interaction, args) {
    let name = args.getString("name");

    if (!name) return interaction.reply("Error: Missing Argument.");
    bot.profiles.set(name, name);

    let category = await interaction.guild.channels.cache.find(
      channel => channel.name === name && channel.type === Discord.ChannelType.GuildCategory);
    if (category) return interaction.reply(`Error: Category \`${name}\` already exists.`);

    category = await interaction.guild.channels.create({
      name: `${name}`,
      type: Discord.ChannelType.GuildCategory
    });
    await createChannel("📷photo-base", category);
    await createChannel("💦correction-images", category);
    await createChannel("💌prompt-a-garder", category);
    await createChannel("🫦insta-publi", category);
    await createChannel("🍆only-fans-publi", category);
    await createChannel("🔒info", category);
    await createChannel("💸revenus", category);

    interaction.reply(`Channels for \`${name}\` profile are created. ✅`);
  }
}
