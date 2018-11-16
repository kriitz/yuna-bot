const Command = require('../command.js');
const request = require('request');

module.exports = class LinkCommand extends Command{
	constructor(bot){
		super(bot, {
			name: 'link',
			alias: [
				'lk',
			],
			usage: '<Account Name>',
			options: [
			],
			description: 'Registers an account linked to your discord ID or sign in as a guest',
		});
	}

	//Access
	hasPermission(msg){
		return true;
	}

	process(msg, suffix){
		const member = msg.member;
		const name = suffix.split(" ")[0];		
		var replyContent = null;

		console.log(suffix);

		if (name == undefined || name == "guest"){
			member.addRole(msg.guild.roles.find('name', 'Guest'));
		}else{
			request();
			
			this.bot.database.ref("users/" + member.id + "/accounts").push({
				name: name,
				verified: false,
			});

			member.addRole(msg.guild.roles.find('name', 'Member'));
		}

		if (msg.channel.name !== "initialize")
			replyContent = `The account named **${name}** has been linked to your discord id`;

		msg.delete();
		return replyContent;
	}
}
