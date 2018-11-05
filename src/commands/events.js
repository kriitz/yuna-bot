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
			const minutesLeft = timeleft / 60000;
			const hoursLeft = timeleft / 3600000;
			msg.channel.send("", {embed:{
				color: 3447003,
				title: events[index][0],
				description: `0d ${hoursLeft}h ${minutesLeft}m left`,
				url: events[index][1],
			}});
		}
		
		return
	}
}
