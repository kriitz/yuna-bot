const Command = require('../command.js');
var MemberSaveData = require('../memberData.js');

module.exports = class StrikeCommand extends Command{
	constructor(bot){
		super(bot, {
			name: 'strike',
			usage: '<@Username> <Number>',
			options: [
				{name: 'p', value: 'Strike the user for a percentage of Silver Serpent instead of a set amount'}
			],
			description: 'Take silvers away from a user',
		});
	}

	//Access
	hasPermission(msg){
		return msg.member.hasPermission("ADMINISTRATOR");
	}

	process(msg, suffix){
		const user = msg.mentions.users.first();
		if (!user)
			return 'please mention a user in your call for this command to work.';
		var replyContent = `${user.username} has been penalized for 10 silvers.`;
		var value = 10;

		const opt = suffix.split(" ")[0];

		if (opt && opt.startsWith("-")){
			suffix = suffix.split(' ')[2];

			if (opt.match('p')){
				value = Math.floor(MemberSaveData(user).silvers * (1 - (parseInt(suffix) * .01)));
				replyContent = `${user.username} has been penalized for ${suffix}% of his or her silvers, a total of ${value} silvers!`;
				suffix = null;
			}
		}else{
			suffix = suffix.split(" ")[1];
			if (suffix){
				value = parseInt(suffix);
				replyContent = `${user.username} has been penalized for ${value} silvers!`;
			}			
		}

		const oldValue = MemberSaveData(user).silvers;

		msg.delete();
		MemberSaveData(user).silvers = MemberSaveData(user).silvers - value;
		return replyContent + ` ${oldValue} => ${MemberSaveData(user).silvers}`;
	}
}