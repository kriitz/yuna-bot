/**
 * Author: Kritz Philip
 */
const Command = require('../command.js');
const request = require('request');

module.exports = class HappyBirthDayCommand extends Command{
	constructor(bot){
		super(bot, {
			name: 'wish',
			alias: [
				'ping'
			],
			usage: '<Command Name>',
			options: [
				{name: 'r', value: 'Display the roles that can call this command'}
			],
			description: 'Pings',
		});
	}

	//Access
	hasPermission(msg){
		return msg.guild.owner === msg.member;
	}

	process(msg, suffix){
		return 'Ping!'
	}
}
