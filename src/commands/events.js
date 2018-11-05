const Command = require('../command.js');
const events = [
	['Double loot on Normal/Hard Dungeons','http://maplestory2.nexon.net/en/news/article/37854/dungeon-delight-event-week-2', 'November 8, 2018 16:00:00']
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
		
		for (let index in events){
			const timeLeft = Math.abs(new Date(events[index][2]).getTime() - new Date().getTime());
			const daysLeft = timeLeft / (3600000 * 24);
			const hoursLeft = (timeLeft - Math.floor(daysLeft) * (3600000 * 24)) / 3600000;
			const minutesLeft = (timeLeft - ((Math.floor(daysLeft) * (3600000 * 24)) + (Math.floor(hoursLeft) * 3600000))) / 60000;
			msg.channel.send("", {embed:{
				color: 3447003,
				title: events[index][0],
				description: `${daysLeft}d ${hoursLeft}h ${minutesLeft}m left`,
				url: events[index][1],
			}});
		}
		
		return
	}
}
