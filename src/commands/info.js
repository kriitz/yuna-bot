const Command = require('../command.js');
var getMemberData = require('../memberData.js');

module.exports = class InfoCommand extends Command{
	constructor(bot){
		super(bot, {
			name: 'info',
			usage: '<Username> or None',
			options: [],
			description: 'Gives complete infomation about you or another user',
		});
	}

	//Access
	hasPermission(msg){
		return msg.member.hasPermission("CREATE_INSTANT_INVITE");
	}

	process(msg, suffix){
		var user = msg.mentions.users.first();
		if (user == null){
			user = msg.author;
		}

		const data = getMemberData(user);
		var stand = "Good";
		if (data.disabled == true){
			stand = 'Disabled';
		}

		var ali = "None";
		if (data.aliases.toString() !== ""){
			console.log("Passed");
			ali = data.aliases.toString();
		}

		console.log(ali);
		msg.channel.send("", {embed: {
			color: 3447003,
			author: {
				name: user.username
			},
			description: data.intro,
			fields: [
			{
				name: 'Aliases:',
				value: ali
			},
			{
				name: 'Standing:',
				value: stand,
				inline: true
			},
			{
				name: 'Kegs:',
				value: data.stacks,
				inline: true
			},
			{
				name: 'Created',
				value: user.createdAt
			}
			],
			thumbnail: {
				url: user.avatarURL
			},
			footer: {
				text: data.silvers + ' Silver Serpents'
			}
		}});
		return
	}
}