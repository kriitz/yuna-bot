const Command = require('../command.js');

module.exports = class HelpCommand extends Command{
	constructor(bot){
		super(bot, {
			name: 'help',
			usage: '',
			options: [
				{name: 'c', value: 'Reply with info on how to use commands'}
			],
			description: 'Reply with noobie info on Yuna',
		});
	}

	//Access
	hasPermission(msg){
		return true;
	}

	process(msg, suffix){
		var replyContent = "Hello, I'm a Yuna bot created by Philip 'Kritz' Nguyen in the home of Witchcraft!\nRole has specific commmands you can use. \n\t Use the command '//commands' to see all your available commands!";
		if (suffix.startsWith('-c'))
			replyContent = "The prefix for all commands is `//`.\nThe command name comes after the prefix i.e: \n`//command`.\nMost commands require a suffix to run properly and that comes after the command name with a space i.e: \n`//command help`.\nIf there are options on the command you want to use, you add it to the command call with a `-` after the command name but before the suffix. I.e: \n`//command -r help`";
		
		return replyContent;
	}
}