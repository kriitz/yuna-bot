const Command = require('../command.js');
var MemberSaveData = require('../memberData.js');

module.exports = class WhoCommand extends Command{
	constructor(bot){
		super(bot, {
			name: 'who',
			usage: '<@Username>',
			options: [],
			description: "Gives a brief summary of this person.",
		});
	}

	hasPermission(msg){
		return true;
	}

	process(msg, suffix){
		var user = msg.mentions.users.first();
		var replyContent = "Please mention a user in your command call."
		
		if(user){
			replyContent = MemberSaveData(user).intro;
		}
		return replyContent;
	}
}