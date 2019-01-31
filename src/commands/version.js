const Command = require('../command.js');

module.exports = class VersionCommand extends Command{
	constructor(bot){
		super(bot, {
			name: 'version',
			alias: [
				'ver'
			],
			usage: '',
			options: [
				{name: 'd', value: 'Display the date in which the build was release'}
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

		if(opt && opt.startsWith("-d")){
			replyContent += `\n\t${process.env.HEROKU_RELEASE_CREATED_AT} ${process.env.HEROKU_APP_NAME}`; 
		}

		return replyContent;
	}
}