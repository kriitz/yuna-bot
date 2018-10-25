const Command = require('../command.js');

module.exports = class HowCommand extends Command{
	constructor(bot){
		super(bot, {
			name: 'how',
			usage: '<Command Name>',
			options: [
				{name: 'r', value: 'Display the roles that can call this command'}
			],
			description: 'Displays full description and options of the command entered',
		});
	}

	//Access
	hasPermission(msg){
		return true;
	}

	process(msg, suffix){
		var result = "\n\n**//"+suffix+"**";
		var cmd = this.bot.commands()[suffix];

		if (!cmd)
			return 'No command with that name is found. Use //commands to see all available commands';

		result += ` *${cmd.get('usage')}*\n${cmd.get('description')}`;

		var options = cmd.get('options');
		if (options){
			for (let index in options){
				result += '\n\t*[-' + options[index].name + ']*\t' + options[index].value;
			}
		}
		return result;
	}
}