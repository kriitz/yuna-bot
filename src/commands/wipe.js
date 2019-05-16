const Command = require('../command.js');

module.exports = class WipeCommand extends Command{
	constructor(bot){
		super(bot, {
			name: 'wipe',
			usage: '<Number>',
			options: [
			],
			description: 'Delete multiple messages at once',
		});
	}

	//Access
	hasPermission(msg){
		return msg.guild.owner === msg.member;
	}

	/**
	* Deletes multiple messages above at once
	* @param {Object} [msg]
	* @param {string} [suffix]
	* @return {string}
	*/
	process(msg, suffix){
		if (typeof(parseInt(suffix)) !== 'number')
			return "you entered a bad suffix. Your suffix needs to be a number.";
		
		msg.channel.fetchMessages({limit:numDeletion}).then(
			msg.channel.bulkDelete(numDeletion).then(messages => msg.reply(`${messages.size} messages have been deleted`))
		);
		
		return;
	}
}