const Command = require('../command.js');

module.exports = class JoinCommand extends Command{
	constructor(bot){
		super(bot, {
			name: 'join',
			usage: '<Channel Name>',
			options: [
			],
			description: 'Makes me join a voice channel',
		});
	}

	//Access
	hasPermission(msg){
		return msg.member.hasPermission('ADMINISTRATOR');
	}

	process(msg, suffix){
		let textChannel = msg.mentions.channels.first();
		if (!textChannel)
			return "no existing Text Channel mentioned.";

		textChannel.join();
		return `joined ${textChannel.name}.`;
	}
}