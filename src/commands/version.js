const Command = require('../command.js');
const request = require('request');

module.exports = class VersionCommand extends Command{
	constructor(bot){
		super(bot, {
			name: 'version',
			alias: [
				'ver'
			],
			usage: '',
			options: [
				{name: 'd', value: 'Display the date in which the build was release'},
				{name: 'u', value: 'Get the latest commit notes'}
			],
			description: 'Display the current build and version of yuna',
		});
	}

	//Access
	hasPermission(msg){
		return true;
	}

	process(msg, suffix){
		let replyContent = `Current build: ${process.env.HEROKU_RELEASE_VERSION}`;
		const opt = suffix.split(" ")[0];
		const opt2 = suffix.split(" ")[1];

		if(opt){
			if(opt == "-d" || opt2 == "-d")
				replyContent += `\n\t${process.env.HEROKU_RELEASE_CREATED_AT} ${process.env.HEROKU_APP_NAME}`; 
		
			if(opt == "-u" || opt2 == "-u"){
				msg.reply("-u");
				let options = {
					uri: 'https://api.github.com/repos/ImKritz/yuna-bot/git/refs/heads/master',
					method: 'GET',
					json: true
				};

				request(options, function (err, res, body){
					if (err){
						msg.reply("Error: " + err);
					}
					msg.reply("Request");
					replyContent += body.object.url;
					/*
					request(body.object.url, { json: true }, (err, res, body)=>{
						msg.reply(body.message);
					});
					*/
					return replyContent;
				});
			}
		}	
	}
}