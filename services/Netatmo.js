require('dotenv').config()
const util = require('util')
const qs = require('qs')
const axios = require('axios')
const BASE_URL = process.env.NETATMO_BASE_URL

class Netatmo {

  /**
   * @constructor
   */
  constructor() {
  }

  /**
   * Add webhook
   * @param webhook
   */
  static addWebhook(webhook) {
    this.authenticate()
      .then(function (response) {
        let access_token = response.data.access_token
        let url = util.format('%s/api/addwebhook', BASE_URL)

        const options = {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${access_token}`
          },
          data: {
            url: webhook
          },
          url,
        }

        axios(options)
          .then(function (response) {
            console.log(response.data)
          })
          .catch(function (error) {
            console.log(error)
          })
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  /**
   * Authenticate
   */
  static authenticate() {
    const data = {
      client_id: process.env.NETATMO_CLIENT_ID,
      client_secret: process.env.NETATMO_CLIENT_SECRET,
      username: process.env.NETATMO_USERNAME,
      password: process.env.NETATMO_PASSWORD,
      scope: 'read_smokedetector',
      grant_type: 'password',
    }

    let url = util.format('%s/oauth2/token', BASE_URL)

    const options = {
      method: 'POST',
      headers: {'content-type': 'application/x-www-form-urlencoded'},
      data: qs.stringify(data),
      url,
    }

    return axios(options)
  }

  /**
   * Get event description
   */
  static getEventDescription(eventType, subType) {

    if (eventType === 'battery_status') {
      if (subType === 0) {
        return 'Low'
      }
      else if (subType === 1) {
        return 'Very Low'
      }
      else {
        return 'Unknown subtype'
      }
    }

    if (eventType === 'detection_chamber_status') {
      if (subType === 0) {
        return 'Clean'
      }
      else if (subType === 1) {
        return 'Dusty'
      }
      else {
        return 'Unknown subtype'
      }
    }

    if (eventType === 'hush') {
      if (subType === 0) {
        return 'Activate'
      }
      else if (subType === 1) {
        return 'Hushed for 15 minutes'
      }
      else {
        return 'Unknown subtype'
      }
    }

    if (eventType === 'smoke') {
      if (subType === 0) {
        return 'Cleared'
      }
      else if (subType === 1) {
        return 'Detected'
      }
      else {
        return 'Unknown subtype'
      }
    }

    if (eventType === 'sound_test') {
      if (subType === 0) {
        return 'Ok'
      }
      else if (subType === 1) {
        return 'Error'
      }
      else {
        return 'Unknown subtype'
      }
    }

    if (eventType === 'tampered') {
      if (subType === 0) {
        return 'Ready'
      }
      else if (subType === 1) {
        return 'Tampered'
      }
      else {
        return 'Unknown subtype'
      }
    }

    if (eventType === 'wifi_status') {
      if (subType === 0) {
        return 'Error'
      }
      else if (subType === 1) {
        return 'Ok'
      }
      else {
        return 'Unknown subtype'
      }
    }

    return 'Unknown event'
  }

  /**
   * Get device
   */
  static getDevice(deviceId, devices) {
    return devices.find(device => device.id === deviceId)
  }
}

module.exports = Netatmo