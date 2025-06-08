const fs = require("fs")

module.exports = async bot => {

  fs.readdirSync("./src/events").filter(f => f.endsWith(".cjs")).forEach(async file => {

    let event = require(`../events/${file}`)
    bot.on(file.split(".cjs").join(""), event.bind(null, bot))
    console.log(`Event ${file} chargé avec succès !`)
  })
}
