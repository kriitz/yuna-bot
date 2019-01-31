const Command = require('../command.js');

module.exports = class AddEventCommand extends Command{
	constructor(bot){
		super(bot, {
			name: 'addevent',
			alias: [
				'addevt',
			],
			usage: '<Name> > <Link> <Time Object>',
			options: [
			],
			description: 'Registers a new event to the event list',
		});
	}

	//Access
	hasPermission(msg){
		return msg.member.hasPermission("ADMINISTRATOR"); // Owner/Admins
	}

	process(msg, suffix){
		let replyContent = "Event added: ";
		const data = this.bot.database;

		const name = suffix.split(">")[0];
		const link = suffix.slice(name.length + 1).split(" ")[0];
		const timeObject = suffix.slice(name.length + link.length + 2);
		
		this.bot.database.ref("bot/events").push({
			name: name,
			link: link,
			time: timeObject,
		});

		return `${replyContent} ${name}`;
	}
}
