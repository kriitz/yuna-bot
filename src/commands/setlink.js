const Command = require('../command.js');

module.exports = class SetLinkCommand extends Command{
	constructor(bot){
		super(bot, {
			name: 'setlink',
			alias: [
				'link',
			],
			usage: '<Url>',
			options: [
			],
			description: 'Add a external link to your profile',
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
			if(snapshot.exists() == true) intro = snapshot.val().intro;

			oldInfo.set({
				intro: intro,
				link: suffix,
			});
		});

		return 'Successful setted a new link';
	}
}
