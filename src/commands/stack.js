const Command = require('../command.js');
var MemberData = require('../memberData.js');

module.exports = class StackCommand extends Command{
	constructor(bot){
		super(bot, {
			name: 'stack',
			usage: '',
			options: [
				{'name': 't', 'value': 'Displays the time passed since your last stack'},
				{'name': 'b', 'value': 'Shows your current balance and kegs'}
			],
			description: 'Gives you silver daily. The amount is 20 silvers + (Keg * 5) silvers',
		});
	}

	//Access
	hasPermission(msg){
		return msg.member.hasPermission("CREATE_INSTANT_INVITE");
	}

	process(msg, suffix){
		var data = MemberData(msg.author);
		const currTime = new Date().getTime();
		const timeleft = currTime - data.stacktime;
		const minutesPast = timeleft / 60000;
		const hoursPast = timeleft / 3600000;
		var replyContent;
		if (minutesPast >= 1440){
			const daily = (data.stacks*5) + 20;
			data.stacks += 1;
			data.silvers += daily;
			data.stacktime = currTime;

			replyContent = "You have recieved `" + daily + " silvers` for today. Come back tomorrow for the next batch.";
		}else{
			const minutesleft = 1440 - minutesPast;
			const hoursleft = 24 - hoursPast;
			replyContent = "Your next stack is ready in `" + Math.floor(hoursleft) + " hours` and `" + Math.floor(minutesleft % 60) + " minutes`.";
		}
		if (suffix.startsWith('-')){
			if (suffix.match('t')){
				replyContent += '\nTime passed since your last stack: `' + Math.floor(hoursPast) + "hours` and `" + Math.floor(minutesPast % 60) + " minutes`.";
			}
			if (suffix.match('b')){
				replyContent += `\nBalance: \n\tSilvers: **${data.silvers}**\n\tKegs: **${data.stacks}**`
			}
		}
		return replyContent;
	}
}