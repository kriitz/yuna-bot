const Discord = require("discord.js");
const fs = require("fs");
const firebase = require("firebase");
const twilioClient = require("twilio")(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const http = require('http');
const express = require('express');
const MessagingResponse = require("twilio").twiml.MessagingResponse;

const app = express();

app.post('/sms', (req, res) => {
	const twiml = new MessagingResponse();

	twiml.message('The Robots are coming! Head for the hills!');

	res.writeHead(200, {'Content-Type': 'text/xml'});
	res.end(twiml.toString());
});

console.log(`Attempting to connect to port: ${process.env.PORT}...`);

http.createServer(app).listen(process.env.PORT || 80, () => {
	console.log('Express server listening on port 1337');
});

const config = {
	apiKey: process.env.FIREBASE_TOKEN,
	authDomain: "yuna-bot7.firebaseapp.com",
	databaseURL: "https://yuna-bot7.firebaseio.com",
	projectId: "yuna-bot7",
	storageBucket: "yuna-bot7.appspot.com",
	messagingSenderId: "930341747568"
};

firebase.initializeApp(config);

module.exports = class YunaClient extends Discord.Client {
	constructor(options = {}){
		super(options);
		this.registry = {};

		this.database = firebase.database();

		this.on("warn", (m) => console.log("[warn]", m));

		//this.on("messageDelete", (msg) => console.log(`[deleted] ${new Date()} ${msg.author.username}: ${msg.content}`));		
	}

	commands(){
		return this.registry;
	}

	/**
	* Loads all the commands and their alias in the Client class
	* @param {array[{string}]} [rawCommands]
	* @return {null}
	*/
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
