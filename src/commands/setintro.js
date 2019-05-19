const Command = require('../command.js');

module.exports = class SetIntroCommand extends Command{
	constructor(bot){
		super(bot, {
			name: 'setintro',
			alias: [
				'setwho'
			],
			usage: '<Description>',
			options: [
			],
			description: 'Sets what people see when they use the /info command on you',
		});
	}

	//Access
	hasPermission(msg){
		return msg.member.hasPermission("CREATE_INSTANT_INVITE");
	}

	process(msg, suffix){
		const oldInfo = this.bot.database.ref(`bot/${msg.guild.id}/user/${msg.author.id}`);
		
		this.bot.database.ref(`bot/${msg.guild.id}/user/${msg.author.id}`).update({
			link: (oldInfo == null)? '' : oldInfo.link,
			intro: suffix,
		});
		return oldIntro.slice(0, 20) + '... **=>** ' + suffix.slice(0,20) + '...';
	}
}