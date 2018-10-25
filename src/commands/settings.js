const fs = require('fs');
const Command = require('../command.js');

var SettingData = JSON.parse(fs.readFileSync(__dirname + '/../../settings.json'));

const CHANGEABLE_VALUES = {
	"Announcement_TextChannel": getTextChannel,
	"Default_TextChannel": getTextChannel,
	"Log_TextChannel": getTextChannel,
	"Follow_ID": getUser
	};

module.exports = class SettingsCommand extends Command{
	constructor(bot){
		super(bot, {
			name: 'settings',
			usage: '<Text Channel> OR None',
			options: [
			],
			description: "Change or view all of your guild's current settings",
		});
	}

	//Access
	hasPermission(msg){
		return msg.member.hasPermission('ADMINISTRATOR');
	}

	process(msg, suffix){
		var replyContent;
		const guildID = msg.guild.id;

		var data = SettingData[guildID];
		if (!data){
			SettingData[guildID] = {
				"Announcement_TextChannel": msg.guild.defaultChannel.id,
				"Default_TextChannel": msg.guild.defaultChannel.id,
				"Log_TextChannel": msg.guild.defaultChannel.id,
				"Follow_ID": msg.guild.members.first().id,
			};
		}
		data = SettingData[guildID];

		if (!suffix){
			replyContent = "```Markdown\n"
				+ `Guild: [${msg.guild.name}] Current Settings\n`
				+ "# Announcement_TextChannel" 
				+ `\n> ${msg.guild.channels.get(data["Announcement_TextChannel"]).name} [ID:${data["Announcement_TextChannel"]}]`
				
				+ "\n\n# Default_TextChannel"
				+ `\n> ${msg.guild.channels.get(data["Default_TextChannel"]).name} [ID:${data["Default_TextChannel"]}]`

				+ "\n\n# Log_TextChannel"
				+ `\n> ${msg.guild.channels.get(data["Log_TextChannel"]).name} [ID:${data["Log_TextChannel"]}]`

				+ "\n\n# Follow_ID"
				+ `\n> ${msg.guild.members.get(data["Follow_ID"]).displayName} [ID:${data["Follow_ID"]}]`				
				+ "\n```";
		}else{
			const toChange = suffix.split(" ")[0];
			const changeTo = suffix.substring(toChange.toString().length + 1);
			console.log(suffix+'\n'+toChange+'\n'+changeTo);
			if (data.hasOwnProperty(toChange)){
				const results = CHANGEABLE_VALUES[toChange](msg);
				if (results === null)
					return "Error 404: `" + changeTo + "` does not exist."

				replyContent = "Setting was successfully changed. `" + toChange + "` is now `" + changeTo + "`";
				data[toChange] = results;
			}else{
				replyContent = "Bad Suffix: The setting `" + toChange + "` does not exist.";
			}
		}

		data = JSON.stringify(SettingData, null, 2);
		fs.writeFileSync(__dirname + '/../../settings.json', data);
		return replyContent;
	}
}

function getUser(msg){
	let user = msg.mentions.users.first();
	return (user) ? user.id : null;
}

function getTextChannel(msg){
	let textChannel = msg.mentions.channels.first();
	return (textChannel) ? textChannel.id : null;
}