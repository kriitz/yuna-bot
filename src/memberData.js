const fs = require('fs');
var MemberSaveData = JSON.parse(fs.readFileSync(__dirname + '/../member.json'));

module.exports = function getMemberData(user){
	var data = MemberSaveData[user.id];

	if (data == undefined){
		MemberSaveData[user.id] = {
			'intro': " ", 
			'silvers': 0, 
			'stacks': 1, 
			'stacktime': 0,
			'disabled': false,
			'aliases': []
		};
	}

	data = JSON.stringify(MemberSaveData, null, 2);
	fs.writeFileSync(__dirname + '/../member.json', data);

	return MemberSaveData[user.id];
}
