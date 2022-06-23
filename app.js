require('dotenv').config();
const Netatmo = require('./services/Netatmo')
const express = require('express');

// Netatmo authentication
const auth = {
	client_id: process.env.NETATMO_CLIENT_ID,
	client_secret: process.env.NETATMO_CLIENT_SECRET,
	username: process.env.NETATMO_USERNAME,
	password: process.env.NETATMO_PASSWORD,
	scope: 'read_smokedetector',
	grant_type: 'password',
};

// Netatmo webhook
const webhook = process.env.APP_URL + '/webhook';

// Authenticate and set webhook
let netatmo = new Netatmo();
netatmo.addWebhook(auth, webhook)

// Create express server
const app = express();
app.use(express.json());
const port = 80;

// Webhook route
app.post('/webhook', function (request, response) {
	response.send(request.body);
});

// Start server
app.listen(port, () => {
	console.log(`App listening on port ${port}`)
})