//
const Yuna = require("./src/client.js");

// [[ Imports ]] const  = require('./src/commands/.js');
const WarnCommand = require('./src/commands/warn.js');
const WipeCommand = require('./src/commands/wipe.js');

const bot = new Yuna();

bot.once("ready", function () {
	bot.user.setGame("Witchcraft | //help");

	const rawCommands = [
		WarnCommand,
		WipeCommand,
  	];
  
	bot.initializeCommands(rawCommands);
	console.log("Ready to begin!");
});

bot.login(process.env.BOT_TOKEN);
    
