require('dotenv').config();
const netatmo = require('./services/netatmo')
const express = require('express');

// Netatmo authentification
const auth = {
	client_id: process.env.NETATMO_CLIENT_ID,
	client_secret: process.env.NETATMO_CLIENT_SECRET,
	username: process.env.NETATMO_USERNAME,
	password: process.env.NETATMO_PASSWORD,
	scope: 'read_smokedetector',
	grant_type: 'password',
};

// Netatmo webhook
const webhook = process.env.NETATMO_WEBHOOK;

// Authenticate and set webhook
let netatmoApi = new netatmo(auth, webhook);

// Create express server
const app = express();
const port = 80;

// Webhook route
app.post('/webhook', function (req, res) {
	res.send('New event!');
	console.log('New event!')
});

// Start server
app.listen(port, () => {
	console.log(`App listening on port ${port}`)
})