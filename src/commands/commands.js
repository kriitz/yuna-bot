const Command = require('../command.js');

module.exports = class CommandsCommand extends Command{
	constructor(bot){
		super(bot, {
			name: 'commands',
			alias: [
			"cmds"
			],
			usage: '',
			options: [
			],
			description: 'Sends all commands available to user',
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
		var printedCmds = [];
	
    	for(var cmd in commands){
    		console.log("Commands searching: " + commands[cmd].name);
    		if (commands[cmd].hasPermission(msg) && printedCmds.includes(commands[cmd]) == false){
				printedCmds.push(commands[cmd]);
	    		info += "**" + cmd + ":**";
	    		/*
	    		var usage = commands[cmd].get('usage');
	    		if(usage !== "")
	    			info += " " + usage + "\n";
	    		*/
	    		info += " " + commands[cmd].description + "\n";
    		}
    	}

    	return info;
	}
}
