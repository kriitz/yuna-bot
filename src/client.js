const Discord = require("discord.js");
const fs = require("fs");

const firebase = require("firebase");

  const config = {
    apiKey: "AIzaSyB9BdapqbWYLtpk4Ci6134kLbj4L_DFWYk",
    authDomain: "yuna-maplestory2.firebaseapp.com",
    databaseURL: "https://yuna-maplestory2.firebaseio.com",
    projectId: "yuna-maplestory2",
    storageBucket: "yuna-maplestory2.appspot.com",
    messagingSenderId: "810852213426"
  };

firebase.initializeApp(config);


module.exports = class YunaClient extends Discord.Client {
	constructor(options = {}){
		super(options);
		this.registry = {};

		this.database = firebase.database();

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

			const alias = command.get('alias');
			for (let i in alias){
				this.registry[alias[i]] = command;
				console.log(alias[i] + ' alias loaded.');
			}
			console.log(command.get('name') + ' command loaded.');
		}
	}
}
