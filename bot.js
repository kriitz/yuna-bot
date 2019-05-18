/*
	Central control script for Yuna bot.
	- Yuna bot is designed for the Witchcraft Discord Server

	- Programmed by Philip "Kritz" Nguyen
*/
const Yuna = require("./src/client.js");
const cron = require("cron").CronJob;

// const
const botId = '504996285900783638';				// Check
const guildId = '393936202123968513';			// Check
const MEMBER_ROLE = '505583948169084929';		// Check

// [[ Imports ]] const  = require('./src/commands/.js');
const HelpCommand = require('./src/commands/help.js');
const WarnCommand = require('./src/commands/warn.js');
const InfoCommand = require('./src/commands/info.js');
const CommandsCommand = require('./src/commands/commands.js');
const EventsCommand = require('./src/commands/events.js');
const VersionCommand = require('./src/commands/version.js');
const HowCommand = require('./src/commands/how.js');
const happyBirthDayCommand = require('./src/commands/happyBirthDay.js');
const AddEventCommand = require('./src/commands/addevent.js');
const WipeCommand = require('./src/commands/wipe.js');
const RemoveEventCommand = require('./src/commands/removeevent.js');
const AwaitCommand = require('./src/commands/await.js');

const bot = new Yuna();
var mainChannel = null;
var testChannel = null;

bot.once("ready", function () {
	const guild = bot.guilds.get(guildId);
	const member = guild.members.get(botId);
	
	mainChannel = guild.channels.find("name", "text"); 		// *Check this when editing channel names
	testChannel = guild.channels.find("name", "test-bot");
	if(mainChannel == null){
		bot.user.setGame("Error: Main channel not found.");
	}else{
		//bot.user.setUsername("Yuna");
		testChannel.send("Ready to go.");
		bot.user.setGame("Witchcraft | /help");
	}

	const rawCommands = [
		WarnCommand,
		HelpCommand,
		InfoCommand,
		CommandsCommand,
		EventsCommand,
		VersionCommand,
		HowCommand,
		happyBirthDayCommand,
		AddEventCommand,
		WipeCommand,
		AwaitCommand,
  	];
  
	bot.initializeCommands(rawCommands);

	// Cronjobs
	/*
	const dayReset = new cron("00 00 17 * * *",function(){
		const sayings = ["It's a new day, it's a new smile!"];
		member.setNickname("Daily Reset - 12:00 UTC").then(
			notifications.send(sayings[Math.floor(Math.random()*sayings.length)] +" @everyone")
		);
		member.setNickname("Yuna");
	}, null, true, "America/Los_Angeles");

	const weekReset = new cron('00 00 17 * * 5', function(){
		const sayings = ["One week after the next, the grind continues"];
		member.setNickname("Week Reset - Friday 12:00 UTC").then(
			notifications.send(sayings[Math.floor(Math.random()*sayings.length)] +" @everyone")
		);
		member.setNickname("Yuna");
	}, null, true, "America/Los_Angeles");
	*/
});

bot.on("guildMemberAdd", function (member){
	const data = bot.database.ref(`bot/${guildId}/awaits`);

	data.once('value', function(snapshot){
		snapshot.forEach(function(cSnapshot){
			let awaiting = cSnapshot.val();
			if(member.id == awaiting.id){
				member.addRole(MEMBER_ROLE);
				member.send("We were waiting for you! You have been automatically added to our system and we also skipped your background checks! Welcome to the team.");
				mainChannel.send(`<@${member.id}>, ${awaiting.message}`);

				bot.database.ref(`bot/${guildId}/awaits/${cSnapshot.key}`).set(null);
			}
		});
	});
});

const BLOCK_WORDS = ["loli"];

bot.on("message", function (msg) {
	if (msg.author == bot.user) return;
	
	if(msg.channel != mainChannel && msg.channel != testChannel){
		if(msg.content.toLowerCase().match("agree")) msg.member.addRole(MEMBER_ROLE);
		msg.delete();
		return;
	}

	if(msg.author.id != bot.user.id && msg.content.startsWith("/")){
		var cmdTxt = msg.content.split(" ")[0].substring(1);
        var suffix = msg.content.substring(cmdTxt.length + 2);
		var cmd = bot.commands()[cmdTxt];

		if(cmd){
			if (cmd.hasPermission(msg)){
				try{
					const replyContent = cmd.process(msg, suffix);
					if (replyContent) msg.reply(replyContent);
				}catch(error){
					mainChannel.send("Command " + cmdTxt + " failed. \n" + error.stack);
				}
				console.log(cmdTxt + " command excuted.");						
			}else{
				msg.reply("you do not have permission to use that command.");
			}
		}
	}else{
		if (msg.mentions.users.first() !== bot.user){
			for (var index in BLOCK_WORDS){
				if(msg.content.toLowerCase().match(BLOCK_WORDS[index])){
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

process.env.TZ = "America/Los_Angeles";
bot.login(process.env.BOT_TOKEN);
