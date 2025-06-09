const Discord = require("discord.js");
const intents = new Discord.IntentsBitField(3276799);
const bot = new Discord.Client({ intents });
const config = require("./config.mjs");
const loadCommands = require("./src/loaders/loadCommands.cjs");
const loadEvents = require("./src/loaders/loadEvents.cjs");

bot.commands = new Discord.Collection();
bot.profiles = new Discord.Collection();
bot.color = "#1EC1E6";
bot.login(config.token);

loadCommands(bot);
loadEvents(bot);
