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
		movingMessage = msg.channel.messages.cache.get(movingMessage);
		if (movingMessage == null) return 'No valid message was found';

		var channel = msg.mentions.channels.first();
		if (channel == null) return 'No channel was mentioned in this message';

		newMessage = movingMessage.content;
		for (var attach of movingMessage.attachments.values()){
			console.log(attach.url);
			newMessage += `\n ${attach.url}`;
		}

		channel.send(newMessage);

		console.log(movingMessage.attachments.concat);
		console.log(movingMessage.embeds.concat)
		return;
	}
}