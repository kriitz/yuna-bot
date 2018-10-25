const Command = require('../command.js');

module.exports = class HideCommand extends Command{
	constructor(bot){
		super(bot, {
			name: 'hide',
			usage: '<Command Name>',
			options: [
				{name: 'r', value: 'Display the roles that can call this command'}
			],
			description: "Go invisible, so Hana does not know I'm here",
		});
	}

	//Access
	hasPermission(msg){
		return msg.member.hasPermission('ADMINISTRATOR');
	}

	process(msg, suffix){
		msg.delete();

		console.log(this.bot);

		this.bot.setPresence("invisible");

		return 'The hidden blade is the deadliest.'
	}
}