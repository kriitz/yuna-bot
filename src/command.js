module.exports = class Command{
	constructor(bot, info){
		this.name = info.name;						// How users all the command 				*Required
		this.description = info.description;		// Description on what the command does
		this.usage = info.usage;					// What the user attach to the command
		this.options = info.options;				// Extra flags to use with command
		this.alias = info.alias;					// Another name to this command by

		this.bot = bot;
	}

	/**
	* Returns the private with the given name
	* @param {string} [value]
	* @return {Other}
	*/
	get(value){
		return this[value];
	}
};
