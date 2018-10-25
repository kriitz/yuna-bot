const Command = require('../command.js');
var MemberData = require('../memberData.js');

module.exports = class DisableCommand extends Command{
	constructor(bot){
		super(bot, {
			name: 'disable',
			usage: '<@Username>',
			options: [
			],
			description: 'Toggle disable on a user. Anyone who is disabled cannot use any commands and recieve any silvers',
		});
	}

	//Access
	hasPermission(msg){
		return msg.member.hasPermission("ADMINISTRATOR");
	}

	process(msg, suffix){
		var user = msg.mentions.users.first();
		if (!user)
			return 'no users were mentioned.'

		var data = MemberData(user);
		data.disabled = !data.disabled;
		msg.delete();

		return "Disabled: " + !data.disabled+ " => " +data.disabled;
	}
}