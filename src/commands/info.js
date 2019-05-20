const Command = require('../command.js');

module.exports = class InfoCommand extends Command{
	constructor(bot){
		super(bot, {
			name: 'info',
			alias: [
			],
			usage: '<@Username>',
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
		if (user == null) user = msg.author;

		var data = this.bot.database.ref(`bot/${msg.guild.id}/users/${user.id}`);

		data.once('value', function(snapshot){
			var introduction = "None";
			var link = "https://www.youtube.com/";
			
			if (snapshot.exists()){
				var snapValue = snapshot.val();

				introduction = snapValue.intro;
				link = snapValue.link;
			}
			
			msg.channel.send("", {embed: {
				color: 3447003,
				author: {
					name: user.username
				},
				title: "Profile",
				description: introduction,
				url: link,
				thumbnail: {
					url: user.avatarURL
				},
				footer: {
					text: 'Reputation: 0'
				}
			}});
		});

		msg.delete();
		return;
	}
}
