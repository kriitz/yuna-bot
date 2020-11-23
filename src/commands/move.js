const Command = require('../command.js');

module.exports = class MoveCommand extends Command{
	constructor(bot){
		super(bot, {
			name: 'move',
			alias: [
				"repost"
			],
			usage: '<Message ID> <@Channel>',
			options: [
			],
			description: "Moves a message to another channel by resending it",
		});
	}

	//Access
	hasPermission(msg){
		return msg.member.hasPermission('ADMINISTRATOR');
	}

	process(msg, suffix){
		msg.delete();

		var newMessage = "";

		var movingMessage = suffix.split(" ")[0];
		msg.channel.messages.fetch(movingMessage).then(mMessage => {
			if (mMessage == null) return 'No valid message was found';
			var channel = msg.mentions.channels.first();
			if (channel == null) return 'No channel was mentioned in this message';

			newMessage = `${mMessage.author.username}:\n${mMessage.content}`;
			for (var attach of mMessage.attachments.values()){
				newMessage += `\n ${attach.url}`;
			}

			mMessage.delete();
			channel.send(newMessage);			
		}).catch(console.error);
		return;
	}
}