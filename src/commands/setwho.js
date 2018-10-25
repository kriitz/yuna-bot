const Command = require('../command.js');
var MemberData = require('../memberData.js');

module.exports = class SetWhoCommand extends Command{
	constructor(bot){
		super(bot, {
			name: 'setwho',
			usage: '<Description>',
			options: [
			],
			description: 'Sets what people see when they use the who command on you',
		});
	}

	//Access
	hasPermission(msg){
		return msg.member.hasPermission("CREATE_INSTANT_INVITE");
	}

	process(msg, suffix){
		let data = MemberData(msg.author);
		const oldIntro = data.intro;
		
		data.intro = suffix;
		return oldIntro.slice(0, 20) + '... **=>** ' + suffix.slice(0,20) + '...';
	}
}