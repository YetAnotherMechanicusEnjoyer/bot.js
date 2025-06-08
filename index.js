const Discord = require("discord.js");
const intents = new Discord.IntentsBitField(3276799);
const bot = new Discord.Client({ intents });
const config = require("./config.mjs");
const loadCommands = require("./Loader/loadCommands");
const loadEvents = require("./Loader/loadEvents");

bot.commands = new Discord.Collection();
bot.color = "#1EC1E6";
bot.login(config.token);

loadCommands(bot);
loadEvents(bot);
