const Command = require('../command.js');
const https = require("https");

var redditHistory = [];

module.exports = class RedditCommand extends Command{
	constructor(bot){
		super(bot, {
			name: 'reddit',
			usage: '',
			options: [
			],
			description: 'Gives a /hot/ from the subreddit entered. Does not repeat same ones',
		});
	}

	//Access
	hasPermission(msg){
		return msg.member.hasPermission("CREATE_INSTANT_INVITE");
	}

	process(msg, suffix){
		var after = "";
		if (redditHistory[suffix] != undefined){
			after = '&after='+redditHistory[suffix].id; 
		}

		var options = {
			protocol: 'https:',
			hostname: 'www.reddit.com',
			path: '/r/' + suffix + '/hot.json?count=1' + after,
			method: 'GET',
			headers: {
				//'Client-ID': 'z2ljddmdleswhdb2jtu7yx98hl4iqy',
			}
		};
		
		if (suffix == ""){
			options.path = '/random.json';
		}

		https.request(options, function(res){
			var data = '';

			response.on('error', (error) => {
				console.log(error);
			});

			response.on('data', (chunk) => {
				data += chunk;
			});

			response.on('end', function () {
				if (data != null && data.data.children[0] != null){
					const listing = data.data.children[0];
						
					redditHistory[suffix] = {'id': listing.data.name};
					msg.reply(listing.data.title+'\n\n\t'+listing.data.selftext+'\n\n'+'<'+listing.data.url+'>');
				}
			});
		}).end();
	}
}