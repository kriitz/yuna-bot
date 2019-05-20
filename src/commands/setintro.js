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
		const oldInfo = this.bot.database.ref(`bot/${msg.guild.id}/users/${msg.author.id}`);

		var intro = "None";
		var link = "";

		oldInfo.once('value').then(function(snapshot){
			this.bot.database.ref(`bot/${msg.guild.id}/users/${msg.author.id}`).set({
				intro: suffix,
				link: snapshot.val().link;
			});
		});

		return 'Successful setted a new intro';
	}
}