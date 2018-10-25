const Command = require('../command.js');
const fs = require('fs');
const SettingData = JSON.parse(fs.readFileSync(__dirname + '/../../settings.json'));
var adminList = [];

module.exports = class MkAdCommand extends Command{
	constructor(bot){
		super(bot, {
			name: 'mkad',
			usage: '<@Username>',
			options: [
			],
			description: 'Votes another user to be ADMINISTRATOR.',
		});
	}

	//Access
	hasPermission(msg){
		return msg.member.hasPermission('ADMINISTRATOR');
	}

	process(msg, suffix){
		var user = msg.mentions.users.first();
		var replyContent = "you already voted for this user.";
		if (!user){
			replyContent = "No valid user mentioned in call.";
		}else{
			const member = msg.member.guild.members.get(user.id);
			if (member.hasPermission('ADMINISTRATOR')){
				replyContent = `${user.username} is already an admin`;
			}else{
				const slot = adminList[user.id];
				if (!slot)
					adminList[user.id] = [];

				if(adminList[user.id].indexOf(msg.author.id) == -1){
					adminList[user.id].push(msg.author.id);
					if (adminList[user.id].length >= 2){
						const channelName = SettingData[msg.guild.id].Announcement_TextChannel;
						const textChannel = msg.guild.channels.get(channelName);

						if (!channelName || !textChannel)
							return "Announcement_TextChannel is `undefined` or your current one no longer exists. Use //settings to set a new channel.";
						
						replyContent = `${user.username} has been successfully made ADMINISTRATOR!`;

						textChannel.send("Congratulations!", {embed: {
							color: 0xE9ABEF,
							author: {
								name: msg.author.username + '#' + msg.author.discriminator,
								iconURL: msg.author.avatarURL
							},
							fields: [
							{
								name: 'User:',
								value: user.username + '#' + user.discriminator,
								inline: true
							},
							{
								name: 'Action:',
								value: 'Granted ADMIN Status',
								inline: true
							}
							],
							thumbnail: {
								url: user.avatarURL
							},
							timestamp: new Date(),
							footer: {
								text: user.id
							}
						}});
					}else{
						replyContent = ` your vote counted for ${user.username}. Need ${2 - adminList[user.id].length} more votes to confirm it.`;
					}
					
				}
			}
		}

		msg.delete();

		return replyContent;
	}
}