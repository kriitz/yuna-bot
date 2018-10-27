const Command = require('../command.js');

module.exports = class CommandsCommand extends Command{
	constructor(bot){
		super(bot, {
			name: 'commands',
			usage: '',
			options: [
			],
			description: 'Displays all commands avialable to you',
		});
	}

	//Access
	hasPermission(msg){
		return true;
	}

	process(msg, suffix){
    	const commands = this.bot.commands();
    	var info = "More infomation about a specific command use `/how <Command Name>`\n"
    		+ `__**Available Yuna Commands:**__ \n\n`

    	for(var cmd in commands){
    		if (commands[cmd].hasPermission(msg)){
	    		info += "**" + cmd + ":**";
	    		
	    		var usage = commands[cmd].get('usage');
	    		if(usage !== "")
	    			info += " " + usage + "\n";
	    		
	    		info += "\t\t" + commands[cmd].description + "\n";
    		}
    	}
    	msg.author.send(info);
    	return
	}
}
