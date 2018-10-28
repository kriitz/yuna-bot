const Command = require('../command.js');

module.exports = class MkCharCommand extends Command{
	constructor(bot){
		super(bot, {
			name: 'mkchar',
			alias: [
				'char',
				'addchar',
				'character'
			],
			usage: '<Character Name> <Level> <Gear Score>',
			options: [
			],
			description: 'Registers a character linked to your discord ID or sign in as a guest',
		});
	}

	//Access
	hasPermission(msg){
		return true;
	}

	process(msg, suffix){
		const member = msg.member;
		const name = suffix.split(" ")[0];
		const lvl = suffix.split(" ")[1];
		const gs = suffix.split(" ")[2];		
		var replyContent = null;

		console.log(suffix);

		if (name == undefined || name == "guest"){
			member.addRole(msg.guild.roles.find('name', 'Guest'));
		}else{

			var numLvl = parseInt(lvl);
			var numGs = parseInt(gs);

			if (numLvl == undefined || typeof(numLvl) !== 'number')
				numLvl = "--";

			if (gs == undefined || typeof(numGs) !== 'number')
				numGs = "--";

			this.bot.database.ref("users/" + member.id + "/characters").push({
				name: name,
				level: numLvl,
				gear: numGs
			});

			member.addRole(msg.guild.roles.find('name', 'Member'));
		}

		if (msg.channel.name !== "initialize")
			replyContent = `The Level **${lvl}** character named **${name}** with a gear score of **${gs}** has been linked to your discord id`;

		msg.delete();
		return replyContent;
	}
}
