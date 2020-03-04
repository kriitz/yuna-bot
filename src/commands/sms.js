const Command = require('../command.js');
const twilio = require("twilio")(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

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
		const text = suffix.slice(number.length + 1);

		twilio.messages.create({
			body: text,
			from: process.env.TWILIO_PHONE_NUMBER,
			to: `+${number}`
		}).then(message => console.log(message.sid));

		// -1000, 500
		// -5, -25 Nether Portal in Nether
		// -125, 76, -70

		// x% of y = y% of x
		// -900, 1500 END PROTAL HOME
		// -1100, 3900 END PROTAL HOME
		// 389, 16, 251 Zombie Spawner 1

		msg.delete();

		return 'Message sent!'
	}
}