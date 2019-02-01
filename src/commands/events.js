const Command = require('../command.js');

module.exports = class EventsCommand extends Command{
	constructor(bot){
		super(bot, {
			name: 'events',
			alias: [
				'event'
			],
			usage: '',
			options: [
			],
			description: 'Gives all the current events currently online',
		});
	}

	//Access
	hasPermission(msg){
		return msg.member.hasPermission("CREATE_INSTANT_INVITE");
	}

	process(msg, suffix){
		const data = this.bot.database.ref(`bot/${msg.guild.id}/events`);

		data.once('value', function(snapshot){
			snapshot.forEach(function(cSnapshot){
				let event = cSnapshot.val();
				const timeLeft = new Date(event.time).getTime() - new Date().getTime();
				
				if(timeLeft > 0){
					const daysLeft = timeLeft / (3600000 * 24);
					const hoursLeft = (timeLeft - Math.floor(daysLeft) * (3600000 * 24)) / 3600000;
					const minutesLeft = (timeLeft - ((Math.floor(daysLeft) * (3600000 * 24)) + (Math.floor(hoursLeft) * 3600000))) / 60000;
					msg.channel.send("", {embed:{
						color: 3447003,
						title: event.name,
						description: `${Math.floor(daysLeft)}d ${Math.floor(hoursLeft)}h ${Math.floor(minutesLeft)}m left`,
						url: event.link,
					}});
				}
			});
		});

		return;
	}
}
