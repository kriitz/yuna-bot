const Command = require('../command.js');

module.exports = class HowCommand extends Command{
	constructor(bot){
		super(bot, {
			name: 'how',
			alias: [
			],
			usage: '<Command Name>',
			options: [
			],
			description: 'Displays full description and options of the command entered',
		});
	}

	//Access
	hasPermission(msg){
		return true;
	}

	/**
	* Replies with the command name and its description
	* @param {Object} [msg]
	* @param {string} [suffix]
	* @return {string}
	*/
	process(msg, suffix){
		var result = "\n\n**/"+suffix+"**";		// Name of command
		var cmd = this.bot.commands()[suffix];	// Get command by name

		if (!cmd)								// If command doesn't exist
			return 'No command with that name is found. Use /commands to see all commands available to you';

		result += ` *${cmd.get('usage')}*\n${cmd.get('description')}`;

		var options = cmd.get('options');
		if (options){
			for (let index in options){
				result += `\n\t*[- ${options[index].name}]*\t${options[index].value}`;
			}
		}
		return result;
	}
}