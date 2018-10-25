const Command = require('../command.js');

const ytdl = require("ytdl-core");
const fs = require("fs");
const SettingData = JSON.parse(fs.readFileSync(__dirname + '/../../settings.json'));

var playlist = [];
var ytPlaying = false;

module.exports = class YoutubeCommand extends Command{
	constructor(bot){
		super(bot, {
			name: 'youtube',
			usage: '<YouTube URL>',
			options: [
			],
			description: 'Plays the audio of a youtube video',
		});
	}

	//Access
	hasPermission(msg){
		return msg.guild.owner === msg.member;
	}

	process(msg, suffix){
		ytdl.getInfo(suffix, {}, function(error, info){
			if (!error){
				playlist.push(suffix);
				if (ytPlaying == false){
					ytPlaying = true;
					playPlaylist(msg.member.guild);
				}
				msg.reply("your request was made. Queue #" + (playlist.length + 1) + "\n\n**" + info.title + "**\n\tLength: `" + ('0' + Math.floor(info.length_seconds / 60)).slice(-2) + "m " + ('0' + (info.length_seconds % 60)).slice(-2) + "s `\n\t<" + suffix + "> ");
			}
		});
		msg.delete();
		return
	}
}

function playPlaylist(guild){
	if (playlist.length == 0){console.log('playPlaylist ended.'); ytPlaying = false; return;}
	const songUrl = playlist.shift();
	const voiceChannel = guild.members.get(SettingData[guild.id].Follow_ID.toString()).voiceChannel;
	console.log(songUrl);

	if (voiceChannel){
		voiceChannel.join().then(conn => {
			let stream = ytdl(songUrl, {quality: 'lowest', filter : 'audioonly'});
			const dispatcher = conn.playStream(stream);
			dispatcher.setVolume(.25);

			dispatcher.once('end', (reason) =>{
				console.log(`${songUrl} ended. ${reason}`);
				playPlaylist(guild);
			});

			dispatcher.once('error', (reason) =>{
				console.log(`[error] ${reason}`);
			});
		});
	}
}
