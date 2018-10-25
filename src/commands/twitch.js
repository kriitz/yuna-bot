const Command = require('../command.js');
const https = require("https");

module.exports = class TwitchCommand extends Command{
	constructor(bot){
		super(bot, {
			name: 'twitch',
			usage: '<Search Word>',
			options: [
				{name: 'd', value: 'Sends the results in your DMs(Direct messages)'},
				{name: 'c', value: 'Search for channels instead of current streamers'}
			],
			description: 'Fetches 10 of the top streamers on right now under your search term',
		});
	}

	//Access
	hasPermission(msg){
		return msg.member.hasPermission("CREATE_INSTANT_INVITE");
	}

	process(msg, suffix){
		var textDirection = msg.channel;
		var searchFor = 'streams';

		const opt = suffix.split(" ")[0];
		if (opt.startsWith("-")){
			suffix = suffix.split(' ')[1];

			if (opt.match('d'))
				textDirection = msg.author;

			if (opt.match('c'))
				searchFor = 'channels';
		}
		var option = {
			protocol: 'https:',
			hostname: 'api.twitch.tv',
			path: '/kraken/search/' + searchFor + '?query=' + suffix + '&limit=10',
			method: 'GET',
			headers: {
				'Client-ID': 'z2ljddmdleswhdb2jtu7yx98hl4iqy',
				'Accept': 'application/vnd.twitchtv.v5+json'
			}
		};

		https.request(option, function(response){
			var data = '';

			response.on('error', (error) => {
				console.log(error);
			});

			response.on('data', (chunk) => {
				data += chunk;
			});

			response.on('end', function () {
				data = JSON.parse(data);

				if (data){
					var content;
					if (searchFor == 'streams'){
						content = "Top Current Online Streamers: " + suffix;
						for (var index = 0; index < 10; index++){
							if (data.streams[index] != null){
								var chan = data.streams[index].channel;
								content += "\n\n -- [[ " + chan.display_name + " ]] --\n\t Game: " + chan.game + "\n\t Viewers: " + data.streams[index].viewers + "\n\t Link: <" + chan.url + ">";
							}
						};
					}else{
						content = "Top Channels: " + suffix.split(' ')[1];
						for (var index = 0; index < 10; index++){
							if (data.channels[index] != null){
								var chan = data.channels[index];
								content += "\n\n -- [[ " + chan.display_name + " ]] --\n\t Game: " + chan.game + "\n\t Views: " + chan.views + "\n\t Link: <" + chan.url + ">";
							}
						};							
					}
					textDirection.send(content);
				}else{
					console.log("No data from api.twitch.tv!");
				}
			});
		}).end();

		return;
	}
}
