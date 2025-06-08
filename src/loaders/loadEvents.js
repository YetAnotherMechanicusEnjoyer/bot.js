const fs = require("fs")

module.exports = async bot => {

  fs.readdirSync("./src/events").filter(f => f.endsWith(".js")).forEach(async file => {

    let event = require(`../events/${file}`)
    bot.on(file.split(".js").join(""), event.bind(null, bot))
    console.log(`Event ${file} chargé avec succès !`)
  })
}
