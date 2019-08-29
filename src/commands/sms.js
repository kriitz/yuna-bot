const Command = require('../command.js');
const twilio = require("twilio");

module.exports = class SMSCommand extends Command{
	constructor(bot){
		super(bot, {
			name: 'sms',
			alias: [
				'text'
			],
			usage: '<Phone Number> <Text>',
			options: [
				{name: 'r', value: 'None'}
			],
			description: 'Sends a text to that number',
		});
	}

	//Access
	hasPermission(msg){
		return msg.guild.owner === msg.member;
	}

	process(msg, suffix){
		const number = suffix.split(" ")[0];
		const text = suffix.split(" ")[1];

		twilio.messages.create({
			body: text,
			from: process.env.TWILIO_PHONE_NUMBER,
			to: `+${number}`
		}).then(message => console.log(message.sid));

		msg.delete();

		return 'Message sent!'
	}
}