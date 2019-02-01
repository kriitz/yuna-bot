const Command = require('../command.js');

module.exports = class RemoveEventCommand extends Command{
	constructor(bot){
		super(bot, {
			name: 'removeevent',
			alias: [
				'rmevt',
				'rmevent',
			],
			usage: '<Event Name>',
			options: [
			],
			description: 'Removes a registered event',
		});
	}

	//Access
	hasPermission(msg){
		return msg.member.hasPermission("ADMINISTRATOR"); // Owner/Admins
	}

	process(msg, suffix){
		let replyContent = "Event added: ";
		const path = `bot/${msg.guild.id}/events`;
		const data = this.bot.database.ref(path);

		data.once('value', function(snapshot){
			snapshot.forEach(function(cSnapshot){
				let key = cSnapshot.key;
				if(cSnapshot.val().name.indexOf(key)){
					this.bot.database.ref(`${path}/${key}`).remove();
				}
			});
		});

		return `${replyContent} ${name}`;
	}
}
