const Command = require('../command.js');

module.exports = class MaskCommand extends Command{
	constructor(bot){
		super(bot, {
			name: 'mask',
			usage: '<Name> or <NULL>',
			options: [
			],
			description: "Gives everyone in the server a new face. If suffix is empty then set everyone's nickname to nothing",
		});
	}

	//Access
	hasPermission(msg){
		return msg.guild.owner === msg.member;
	}

	process(msg, suffix){
		suffix = suffix || "";
		for (var member of msg.guild.members.values()){
			member.setNickname(suffix);
		}
		msg.delete();
		return "Activated the power of the mask!";
	}
}
