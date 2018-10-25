const Discord = require("discord.js");
const fs = require("fs");

var MemberData = require('./memberData.js');
const SettingData = JSON.parse(fs.readFileSync(__dirname + '/../settings.json'));

const champions = ["Aatrox", "Gangplank", "Leona", "Ezreal", "Vayne", "Jayce", "Rumble", "Draven", "Teemo", "Nami", "Ahri",
"Vi", "Xayah", "Twitch", "Riven", "Rakan", "Jinx", "Jhin", "Janna", "Caitlyn"
];

function messageLog(guild, text){
	const textchan = guild.channels.get(SettingData[guild.id].Log_TextChannel);
	if (!textchan){
		console.log("Error: Log_TextChannel does not exist. " + text);
		return;
	}
	const time = new Date();
	textchan.send(text + ` [${time}]`);
}

module.exports = class YunaClient extends Discord.Client {
	constructor(options = {}){
		super(options);
		this.registry = {};

		this.on("warn", (m) => console.log("[warn]", m));

		// Event on user joining a voice channel
		this.on("voiceStateUpdate", function (oldUser, newUser) {
			if (newUser.id == SettingData[oldUser.guild.id].Follow_ID) {
				const voiceChannel = newUser.voiceChannel;

				if (voiceChannel)
					voiceChannel.join();
			}
		});

		this.on("messageDelete", (msg) => console.log(`[deleted] ${new Date()} ${msg.author.username}: ${msg.content}`));

		this.on("guildMemberAdd", function(member){
			const guild = member.guild;
			const textchan = guild.channels.get(SettingData[guild.id].Default_TextChannel);
			textchan.send(member.user.username + " has entered the realm. //help for stuff");
		});

		// When user's presence changes
		this.on("presenceUpdate", function(oldMember, newMember){
			const role = newMember.highestRole;
			if (newMember.presence.status == "online"){
				if (role.name == "Admin" || role.name == "Kritz"){
					const offset = Math.floor(Math.random() * 10);
					newMember.guild.setIcon(fs.readFileSync(__dirname + '/../Icons/' + champions[Math.floor((Math.random() * 10) + 1) + offset] + ".png")).then(updated => console.log('Updated the guild icon')).catch(console.error);
				}
			}
		});		
	}

	// @parm 
	commands(){
		return this.registry;
	}

	initializeCommands(rawCommands){
		for (let index in rawCommands){
			let command = new rawCommands[index](this);
			this.registry[command.get('name')] = command;
			console.log(command.get('name') + ' command loaded.');
		}
	}
}