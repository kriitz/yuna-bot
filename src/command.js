module.exports = class Command{
	constructor(bot, info){
		this.name = info.name;
		this.description = info.description;
		this.usage = info.usage;
		this.role = info.role;
		this.options = info.options;

		this.bot = bot;
	}

	get(value){
		return this[value];
	}
};
