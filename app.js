require("dotenv").config();
const NetatmoService = require("./services/Netatmo");
const express = require("express");
const netatmo = require('netatmo');

// Netatmo webhook
const WEBHOOK = process.env.APP_URL + "/webhook";

// Authenticate and set webhook
let netatmoService = new NetatmoService();
netatmoService.addWebhook(WEBHOOK);

// Create express server
const app = express();
app.use(express.json());
const port = 80;

// Webhook route
app.post("/webhook", function (request, response) {

  let homeId = request.body.home_id;
  let deviceId = request.body.device_id;
  let eventType = request.body.event_type;
  let subType = request.body.sub_type;
  let eventDescription = getEventDescription(eventType, subType);

  let auth = {
    client_id: process.env.NETATMO_CLIENT_ID,
    client_secret: process.env.NETATMO_CLIENT_SECRET,
    username: process.env.NETATMO_USERNAME,
    password: process.env.NETATMO_PASSWORD,
  };

  let api = new netatmo(auth);

  let getHomeData = function(err, data) {

    let homeName = data.homes[0].name;
    let deviceName = getDevice(deviceId, data.homes[0].smokedetectors).name;

    console.log(`Home: ${homeName}\nDevice: ${deviceName}\nEvent Type: ${eventType}\nDescription: ${eventDescription}`);
  };

  // Event Listeners
  api.on('get-homedata', getHomeData);

  // Get home data
  api.getHomeData();

  response.send(request.body);
});

// Start server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

/**
 * Get event description
 */
function getEventDescription(eventType, subType) {

  if (eventType === 'battery_status') {
    if (subType === 0) {
      return "Low"
    }
    else if (subType === 1) {
      return "Very Low"
    }
    else {
      return "Unknown subtype"
    }
  }

  if (eventType === 'detection_chamber_status') {
    if (subType === 0) {
      return "Clean"
    }
    else if (subType === 1) {
      return "Dusty"
    }
    else {
      return "Unknown subtype"
    }
  }

  if (eventType === 'hush') {
    if (subType === 0) {
      return "Activate"
    }
    else {
      return "Unknown subtype"
    }
  }

  if (eventType === 'smoke') {
    if (subType === 0) {
      return "Cleared"
    }
    else if (subType === 1) {
      return "Detected"
    }
    else {
      return "Unknown subtype"
    }
  }

  if (eventType === 'sound_test') {
    if (subType === 0) {
      return "Ok"
    }
    else if (subType === 1) {
      return "Error"
    }
    else {
      return "Unknown subtype"
    }
  }

  if (eventType === 'tampered') {
    if (subType === 0) {
      return "Ready"
    }
    else if (subType === 1) {
      return "Tampered"
    }
    else {
      return "Unknown subtype"
    }
  }

  if (eventType === 'wifi_status') {
    if (subType === 0) {
      return "Error"
    }
    else if (subType === 1) {
      return "Ok"
    }
    else {
      return "Unknown subtype"
    }
  }

  return "Unknown event"
}

/**
 * Get device
 */
function getDevice(deviceId, devices) {
  return devices.find(device => device.id === deviceId);
}