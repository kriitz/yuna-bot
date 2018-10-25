const Command = require('../command.js');

module.exports = class EraseCommand extends Command{
	constructor(bot){
		super(bot, {
			name: 'erase',
			usage: '<@Username>',
			options: [
			],
			description: "Gets rid of one's existance.",
		});
	}

	//Access
	hasPermission(msg){
		return msg.member.hasPermission('ADMINISTRATOR');
	}

	process(msg, suffix){
		const user = msg.mentions.users.first();
		var msgNumber = 0;
		if (!user)
			return "no existing Text Channel mentioned.";

		msg.channel.fetchMessages().then(messages => {
			messages.filter(function (message){
				return message.author == user;
			});
			msgNumber = messages.size;
			messages.deleteAll();
		});

		msg.delete();
		return `${user.username} has been erased from this channel. A total of ${msgNumber} messages were deleted.`;
	}
}