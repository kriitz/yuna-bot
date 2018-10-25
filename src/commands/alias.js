const Command = require('../command.js');
var MemberData = require('../memberData.js');

module.exports = class AliasCommand extends Command{
	constructor(bot){
		super(bot, {
			name: 'alias',
			usage: '<@Username> <Name>',
			options: [],
			description: "Give this person a alias.",
		});
	}

	hasPermission(msg){
		return msg.member.hasPermission('ADMINISTRATOR');
	}

	process(msg, suffix){
		const user = msg.mentions.users.first();
		var replyContent = "Please mention a user in your command call."
		const name = suffix.split(" ")[1];

		if(user){
			MemberData(user).aliases.push(name);
			replyContent = `${name} has been added to ${user.username}'s profile as an alias.`;
		}
		msg.delete();
		return replyContent;
	}
}