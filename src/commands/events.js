const Command = require('../command.js');
const events = [
	['Double loot on Normal/Hard Dungeons','http://maplestory2.nexon.net/en/news/article/37854/dungeon-delight-event-week-2', 'November 8, 2018 16:00:00'],
	['Chaos Dungeons Release', 'http://maplestory2.nexon.net/en/news/article/37793/update-nov-5-coming-soon-chaos-rising-update', 'November 7, 2018 16:00:00']
	
];

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
		const data = this.bot.database.ref('bot/events');

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

		return
	}
}
