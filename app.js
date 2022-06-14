const netatmo = require('netatmo');
require('dotenv').config();

// Netatmo API Authentication
let auth = {
	"client_id": process.env.NETATMO_CLIENT_ID,
	"client_secret": process.env.NETATMO_CLIENT_SECRET,
	"username": process.env.NETATMO_USERNAME,
	"password": process.env.NETATMO_PASSWORD,
};
let api = new netatmo(auth);

let getHomeData = function(err, data) {
	console.log(data);
};

// Event Listeners
api.on('get-homedata', getHomeData);

// Get Home Data
// https://dev.netatmo.com/apidocumentation/security#homesdata
api.getHomeData();