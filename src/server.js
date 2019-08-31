const http = require('http');
const express = require('express');
const MessagingResponse = require("twilio").twiml.MessagingResponse;

const app = express();

app.post('/sms', (req, res) => {
	const twiml = new MessagingResponse();

	twiml.message('The Robots are coming! Head for the hills!');

	res.writeHead(200, {'Content-Type': 'text/xml'});
	res.end(twiml.toString());
});

console.log(`Attempting to connect to port: ${process.env.PORT}...`);

http.createServer(app).listen(process.env.PORT || 80, () => {
	console.log('Express server listening on port 1337');
});