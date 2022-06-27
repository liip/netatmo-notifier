require('dotenv').config()
const NetatmoService = require('./services/Netatmo')
const express = require('express')
const netatmo = require('netatmo')

// Netatmo webhook
const WEBHOOK = process.env.APP_URL + '/webhook'

// Set webhook
NetatmoService.addWebhook(WEBHOOK)

// Create express server
const app = express()
app.use(express.json())
const port = 80

// Webhook route
app.post('/webhook', function (request, response) {

  const deviceId = request.body.device_id
  const eventType = request.body.event_type
  const subType = request.body.sub_type
  const eventDescription = NetatmoService.getEventDescription(eventType, subType)

  let auth = {
    client_id: process.env.NETATMO_CLIENT_ID,
    client_secret: process.env.NETATMO_CLIENT_SECRET,
    username: process.env.NETATMO_USERNAME,
    password: process.env.NETATMO_PASSWORD,
  }

  let api = new netatmo(auth)

  let getHomeData = function(err, data) {

    let homeName = data.homes[0].name
    let deviceName = NetatmoService.getDevice(deviceId, data.homes[0].smokedetectors).name

    console.log(`Home: ${homeName}\nDevice: ${deviceName}\nEvent Type: ${eventType}\nDescription: ${eventDescription}`)
  }

  // Event Listeners
  api.on('get-homedata', getHomeData)

  // Get home data
  api.getHomeData()

  response.send(request.body)
})

// Start server
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})