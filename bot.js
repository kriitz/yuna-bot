/*
	Central control script for Yuna bot.
	- Yuna bot is designed for the Witchcraft Discord Server

	- Programmed by Philip "Kritz" Nguyen
*/
const Yuna = require("./src/client.js");
const cron = require("cron").CronJob;
const https = require("https");
const util = require('util');
const newRelic = require('newrelic');
const bodyParser = require('body-parser');
const parseString = require('xml2js').parseString;

// const
const OWNER_ID = '89488149201326080';
const botId = '504996285900783638';				// Check
const guildId = '393936202123968513';				// Check
const MEMBER_ROLE = '505583948169084929';			// Check
const INIT_CHANNEL_ID = '578376730092240897';			// Check
const TEXT_CHANNEL_ID = '505595460078272517';
const BOT_CHANNEL_ID = '578797079896391680';

// [[ Imports ]] const  = require('./src/commands/.js');
const HelpCommand = require('./src/commands/help.js');
const WarnCommand = require('./src/commands/warn.js');
const CommandsCommand = require('./src/commands/commands.js');
const EventsCommand = require('./src/commands/events.js');
const VersionCommand = require('./src/commands/version.js');
const HowCommand = require('./src/commands/how.js');
const happyBirthDayCommand = require('./src/commands/happyBirthDay.js');
const AddEventCommand = require('./src/commands/addevent.js');
const WipeCommand = require('./src/commands/wipe.js');
const RemoveEventCommand = require('./src/commands/removeevent.js');
const AwaitCommand = require('./src/commands/await.js');
const SMSCommand = require('./src/commands/sms.js');

const InfoCommand = require('./src/commands/info.js');
const SetIntroCommand = require('./src/commands/setintro.js');
const SetLinkCommand = require('./src/commands/setlink.js');

const bot = new Yuna();

var mainChannel = null;
var testChannel = null;
var initChannel = null;

const http = require('http');
const express = require('express');
const MessagingResponse = require("twilio").twiml.MessagingResponse;

const app = express();

bot.once("ready", function () {
	const guild = bot.guilds.get(guildId);
	const member = guild.members.get(botId);
	
	mainChannel = guild.channels.get(TEXT_CHANNEL_ID); 		// *Check this when editing channel names
	testChannel = guild.channels.get(BOT_CHANNEL_ID);
	initChannel = guild.channels.get(INIT_CHANNEL_ID);
	
	if(mainChannel == null){
		bot.user.setActivity('Developing', { type: 'WATCHING' });
	}else{
		//bot.user.setUsername("Yuna");
		testChannel.send("Ready to go.");
		bot.user.setActivity('Witchcraft', { type: 'WATCHING' });
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
		SetIntroCommand,
		SetLinkCommand,
		SMSCommand,
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
/*
bot.on("messageReactionAdd", function (reaction, user){
	var message = reaction.message;
	var op = message.author;
	if(user == op) return

	if(reaction.emoji.name == "star"){
		bot.database.ref(`bot/${guildId}/users/${op.id}/reputation`).once(){
			var rep = snapshot.val();
			rep = 
		}
	}
});
*/
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
	
	if(msg.author.id != OWNER_ID){
		if(msg.channel == initChannel){
			if(msg.content.toLowerCase().match("agree")) msg.member.addRole(MEMBER_ROLE);
			msg.delete();
			return;
		}
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
					testChannel.send("Command " + cmdTxt + " failed. \n" + error.stack);
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
		console.log(err.stack);
	} else {
		console.log(err);
		console.log(err.stack);
		process.exit(0);
	}
});

process.env.TZ = "America/Los_Angeles";
bot.login(process.env.BOT_TOKEN);

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/sms', (req, res) => {
	const twiml = new MessagingResponse();
	const body = req.body.Body;

	if(body.match("work") != null){
		// School: 45.438680, -122.731426

		console.log(`Body: ${body}`);
		console.log(body.split(",")[0], body.split(",")[1].split(" ")[0]);

		var option = {
			protocol: 'https:',
			hostname: 'developer.trimet.org',
			path: `/ws/V1/trips/tripplanner?fromCoord=${body.split(",")[0]},${body.split(",")[1].split(" ")[0]}&toCoord=45.438679,-122.731423&appID=${process.env.TRIMET_APP_ID}`,			
			method: 'GET'
			/*
			headers: {
				'Client-ID': 'z2ljddmdleswhdb2jtu7yx98hl4iqy',
				'Accept': 'application/vnd.twitchtv.v5+json'
			}
			*/
		};

		https.request(option, function(response){
			var data = '';

			response.on('error', (error) => { console.log(error); });
			response.on('data', (chunk) => { data += chunk; });

			response.on('end', function () {
				if (data){
					parseString(data, function (err, result) {
					    console.log(util.inspect(result, false, null));
					});
				}else{
					console.log("No data from trimet!");
				}
			});
		}).end();
	}

	twiml.message('The Robots are coming! Head for the hills!');

	res.writeHead(200, {'Content-Type': 'text/xml'});
	res.end(twiml.toString());
});

console.log(`Attempting to connect to port: ${process.env.PORT}...`);

http.createServer(app).listen(process.env.PORT || 80, () => {
	console.log(`Express server listening on port: ${process.env.PORT}`);
});
