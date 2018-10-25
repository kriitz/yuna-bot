const fs = require('fs');
const Command = require('../command.js');
const SettingData = JSON.parse(fs.readFileSync(__dirname + '/../../settings.json'));

module.exports = class BanCommand extends Command{
	constructor(bot){
		super(bot, {
			name: 'ban',
			usage: '<@Username> <Reason>',
			options: [
			{name: 'm', value: 'Erase all messages sent by this user within a week time period'}
			],
			description: "Bans the user and erase all evidence of this user's existance",
		});
	}

	hasPermission(msg){
		return msg.member.hasPermission("ADMINISTRATOR");
	}

	process(msg, suffix){
		var daysErase = 0;
		const channelName = SettingData[msg.guild.id].Announcement_TextChannel;
		const textChannel = msg.guild.channels.get(channelName);

		if (!channelName || !textChannel){
			return "Announcement_TextChannel is `undefined` or your current one no longer exists. Use //settings to set a new channel.";
		}

		const user = msg.mentions.users.first();
		if (!user)
			return "No user were mentioned or invalid member.";

		const member = msg.member.guild.members.get(user.id);
		let author = msg.author;
		let reason = suffix.substring(user.toString().length + 1);
		if (reason == '') reason = 'Unknown';

		if (member.hasPermission("ADMINISTRATOR"))
			return 'you can not ban an immortal object.';

		if (suffix.startsWith('-m')) daysErase = 7;

		textChannel.send("", {embed: {
			color: 0xd85050,
			author: {
				name: author.username + '#' + author.discriminator,
				iconURL: author.avatarURL
			},
			fields: [
			{
				name: 'User:',
				value: user.username + '#' + user.discriminator,
				inline: true
			},
			{
				name: 'Role:',
				value: member.highestRole.name,
				inline: true
			},
			{
				name: 'Action:',
				value: 'Ban',
				inline: true
			},
			{
				name: 'Reason:',
				value: reason
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

		member.ban(daysErase);

		msg.delete();
		return `${user.username} has been successfully banned and recorded.`;
	}
}