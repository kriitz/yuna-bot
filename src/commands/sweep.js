const Command = require('../command.js');

module.exports = class SweepCommand extends Command{
	constructor(bot){
		super(bot, {
			name: 'sweep',
			usage: '<Number>',
			options: [
			],
			description: 'Destroys all messages old than number given in days. Powerful command',
		});
	}

	//Access
	hasPermission(msg){
		return msg.guild.owner === msg.member;
	}

	process(msg, suffix){
		const days = parseInt(suffix);
		if (typeof(days) != 'number' || days <= 0)
			return "you entered a bad suffix. Your suffix needs to be a number and greater than 0.";

		console.log(days * 86400);
		let msgNum = this.bot.sweepMessages(days * 86400);
		return msgNum + " messages have been deleted from the server."
	}
}