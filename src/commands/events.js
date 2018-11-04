const Command = require('../command.js');
const events = [
	['Double loot on Normal/Hard Dungeons','http://maplestory2.nexon.net/en/news/article/37854/dungeon-delight-event-week-2']
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
			msg.channel.send("", {embed:{
				color: 3447003,
				title: events[index][0],
				url: events[index][1],
			}});
		}
		
		return
	}
}
