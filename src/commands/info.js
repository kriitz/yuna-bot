const Command = require('../command.js');

module.exports = class InfoCommand extends Command{
	constructor(bot){
		super(bot, {
			name: 'info',
			alias: [
			],
			usage: '<Username>',
			options: [
			],
			description: 'Gives complete infomation about you or another user',
		});
	}

	//Access
	hasPermission(msg){
		return true;
	}

	process(msg, suffix){
		var user = msg.mentions.users.first();
		if (user == null){
			user = msg.author;
		}

		const data = this.bot.database;
		const characters = data.ref('users/' + msg.author.id + '/characters');
		if (characters == null){
			return;
		}

		characters.once('value', function(snapshot){
			var fields = [];
			snapshot.forEach(function(cSnapshot){
				let char = cSnapshot.val();
				fields.push({name: char.name, value: `**Level:** ${char.level} **Gear Score:** ${char.gear}`});
			})
				msg.channel.send("", {embed: {
					color: 3447003,
					author: {
						name: user.username
					},
					description: "Characters:",
					fields: fields,
					thumbnail: {
						url: user.avatarURL
					},
					footer: {
						text: ''
					}
				}})
		});

		msg.delete();
		return
	}
}
