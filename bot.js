//
const Yuna = require("./src/client.js");

// [[ Imports ]] const  = require('./src/commands/.js');
const MkCharCommand = require('./src/commands/mkchar.js');
const WarnCommand = require('./src/commands/warn.js');

const bot = new Yuna();
var mainChannel = null;

bot.once("ready", function () {
	bot.user.setGame("Witchcraft | /help");
	mainChannel = bot.guilds.get("393936202123968513").channels.find("name","bot");

	const rawCommands = [
		MkCharCommand,
		WarnCommand,
  	];
  
	bot.initializeCommands(rawCommands);
	mainChannel.send("Ready to begin!");
});

const blockedWords = ["loli"];

bot.on("message", function (msg) {
	if (msg.author == bot.user)
		return

	if(msg.author.id != bot.user.id && msg.content.startsWith("/")){
		var cmdTxt = msg.content.split(" ")[0].substring(1);
        var suffix = msg.content.substring(cmdTxt.length + 2);
		var cmd = bot.commands()[cmdTxt];

		if(cmd){
			if (cmd.hasPermission(msg)){
				try{
					const replyContent = cmd.process(msg, suffix);
					if (replyContent) msg.reply(replyContent);
				} catch(error){
					mainChannel.send("Command " + cmdTxt + " failed. \n" + error.stack);
				}
				console.log(cmdTxt + " command excuted.");						
			}else{
				msg.reply("you do not have permission to use that command.");
			}
		}
	}else{
		if (msg.mentions.users.first() !== bot.user){
			for (var index in blockedWords){
				if(msg.content.toLowerCase().match(blockedWords[index])){
					msg.reply("Your message was deleted, we do not condone dark humor or loliconic on our server. \n\t" + msg.author.username + " you have been warned.")
					msg.delete();
				}	
			}
		}else{
			msg.reply("You mentioned me!");
		}
    }
});

process.on('uncaughtException', function(err) {
	if (err.code == 'ECONNRESET') {
		console.log('Got an ECONNRESET! This is *probably* not an error. Stacktrace:');
		mainChannel.send(err.stack);
	} else {
		mainChannel.send(err);
		mainChannel.send(err.stack);
		process.exit(0);
	}
});

bot.login(process.env.BOT_TOKEN);
