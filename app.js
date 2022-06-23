require("dotenv").config();
const Netatmo = require("./services/Netatmo");
const EventNetatmo = require("./models/EventNetatmo");
const express = require("express");

// Netatmo authentication
const auth = {
  client_id: process.env.NETATMO_CLIENT_ID,
  client_secret: process.env.NETATMO_CLIENT_SECRET,
  username: process.env.NETATMO_USERNAME,
  password: process.env.NETATMO_PASSWORD,
  scope: "read_smokedetector",
  grant_type: "password",
};

// Netatmo webhook
const webhook = process.env.APP_URL + "/webhook";

// Authenticate and set webhook
let netatmo = new Netatmo();
netatmo.addWebhook(auth, webhook);

// Create express server
const app = express();
app.use(express.json());
const port = 80;

// Webhook route
app.post("/webhook", function (request, response) {

  // Get message from Netatmo event
  let msg = createMessageFromNetatmoRequest(request);

  console.log(msg);
  response.send(request.body);
});

// Start server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

/**
 * Create message from Netatmo request
 * @param request
 */
function createMessageFromNetatmoRequest(request) {

  // Create new event Netatmo
  let event = new EventNetatmo(
    request.body.home_id,
    request.body.device_id,
    request.body.event_type,
    request.body.sub_type,
  );

  return `Home: ${event.homeId}\nDevice: ${event.deviceId}\nEvent Type: ${event.eventType}\nDescription: ${event.getEventDescription()}`;
}