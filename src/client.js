const Discord = require("discord.js");
const fs = require("fs");

//var MemberData = require('./memberData.js');

module.exports = class YunaClient extends Discord.Client {
	constructor(options = {}){
		super(options);
		this.registry = {};

		this.on("warn", (m) => console.log("[warn]", m));

		this.on("messageDelete", (msg) => console.log(`[deleted] ${new Date()} ${msg.author.username}: ${msg.content}`));		
	}

	// @parm 
	commands(){
		return this.registry;
	}

	initializeCommands(rawCommands){
		for (let index in rawCommands){
			let command = new rawCommands[index](this);
			this.registry[command.get('name')] = command;
			console.log(command.get('name') + ' command loaded.');
		}
	}
}
