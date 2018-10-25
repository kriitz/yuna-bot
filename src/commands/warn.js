const Command = require('../command.js');

module.exports = class WarnCommand extends Command{
	constructor(bot){
		super(bot, {
			name: 'warn',
			usage: '<Command Name>',
			options: [
				{name: 'r', value: 'Display the roles that can call this command'}
			],
			description: 'Pings',
		});
	}

	//Access
	hasPermission(msg){
		return msg.guild.owner === msg.member;
	}

	process(msg, suffix){
		return 'Ping!'
	}
}
