const loadSlashCommands = require("../loaders/loadSlashCommands.cjs")

module.exports = async bot => {

  await loadSlashCommands(bot)

  console.log(`${bot.user.tag} est bien en ligne !`)
}
