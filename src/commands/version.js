const Command = require('../command.js');
const request = require('request');
var lastUFlag = 0;

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

	// Access
	hasPermission(msg){
		return true;
	}

	/**
	* Fetches latest build from Heroku
	* -d Fetches more data from Heroku
	* -u Sends a request to GitHub for a JSON of data from last commit
	* @param {Object} [msg]
	* @param {string} [suffix] 
	* @return {string}
	*/
	process(msg, suffix){
		let replyContent = `Current build: ${process.env.HEROKU_RELEASE_VERSION}`; // Default print
		const opt = suffix.split(" ")[0];		// Getting option flags
		const opt2 = suffix.split(" ")[1];

		if(opt){
			if(opt == "-d" || opt2 == "-d")
				replyContent += `\n\t${process.env.HEROKU_RELEASE_CREATED_AT} ${process.env.HEROKU_APP_NAME}`; 
		
			if(opt == "-u" || opt2 == "-u"){
				const currentTime = new Date().getTime();
				const timeLeft = currentTime - lastUFlag;
				const msInTwoMinutes = 1000*60*2; // 1000 ms = 1 s
				if(timeLeft > msInTwoMinutes){ // Github API allows 60 requests per hour*
					lastUFlag = currentTime;

					let options = {
						url: 'https://api.github.com/repos/ImKritz/yuna-bot/git/refs/heads/master',
						headers:{
							'User-Agent': 'request'
						},
						json: true
					};

					request.get(options, function(err, res, body){
						if (err){
							msg.reply("Error: " + err);
						}else if(res.statusCode != 200){
							msg.reply(`Response Code: ${res.statusCode}`);
						}
						
						let options = {
							url: body.object.url,
							headers:{
								'User-Agent': 'request'
							},
							json: true
						};

						request.get(options, function(err, res, body){
							msg.channel.send("", {embed:{
								color: 3447003,
								author: {
									name: `Committer: ${body.committer.name}`,
								},
								title: "Last Update sent to GitHub",
								description: body.message,
								url: body.html_url,
								footer: {
									text: `Original Author: ${body.author.name}`,
								}
							}});
						});
					});
				}else{
					msg.reply(`Due to GitHub's API policy we can only run -u once every two minutes. Time left: ${Math.floor((((lastUFlag + 1000*60*2) - (lastUFlag + timeLeft)) / 1000*60))}s`);
				}
			}
		}

		return replyContent;
	}
}