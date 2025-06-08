const fs = require("fs")

module.exports = async bot => {

  fs.readdirSync("./src/cmds").filter(f => f.endsWith(".mjs")).forEach(async file => {

    let mod = require(`../cmds/${file}`);
    let command = mod.command;
    if (!command.name || typeof command.name !== "string") throw new TypeError(`La commande ${file.slice(0, file.length - 4)} n'a pas de nom !`)
    bot.commands.set(command.name, command)
    console.log(`Commande ${file} chargée avec succès !`)
  })
}
