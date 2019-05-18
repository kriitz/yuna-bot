const Command = require('../command.js');

module.exports = class AwaitCommand extends Command{
	constructor(bot){
		super(bot, {
			name: 'await',
			usage: '<User ID> <string>',
			options: [
			],
			description: "Wait for a user to enter the server and give them a warm welcome.",
		});
	}

	//Access
	hasPermission(msg){
		return msg.member.hasPermission('ADMINISTRATOR');
	}

	process(msg, suffix){
		const id = suffix.split(" ")[0];
		const message = suffix.slice(id.length + 1);

		this.bot.database.ref(`bot/${msg.guild.id}/awaits`).push({
			id: id,
			message: message,
		});

		msg.delete();
		return `We are awaiting a special someone...`;
	}
}