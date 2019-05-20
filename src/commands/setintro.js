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
		
		var oldIntro = "None";

		//
		var dataIntro = suffix;
		var dataLink = "";

		oldInfo.once('value', function(snapshot){
			if(snapshot.exist()){
				oldData = snapshot.val();

				dataLink = oldData.link;
				oldIntro = oldIntro.intro;
			}
		}).then(
			this.bot.database.ref(`bot/${msg.guild.id}/users/${msg.author.id}`).set({
				link: dataLink,
				intro: dataIntro,
			})
		).catch(
			msg.reply("Broke")
		);



		return oldIntro.slice(0, 20) + '... **=>** ' + suffix.slice(0,20) + '...';
	}
}