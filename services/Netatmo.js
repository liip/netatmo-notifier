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
    let access_token = process.env.NETATMO_TOKEN_ACCESS
    let url = util.format('%s/api/addwebhook', BASE_URL)
    const data = {
      url: webhook
    }

    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${access_token}`
      },
      data: qs.stringify(data),
      url,
    }
    console.log(`trying to create a webhook on url ${url}`)
    axios(options)
      .then(function (response) {
        console.log('webhook created with success')
        console.log(response.data)
      })
      .catch(function (error) {
        console.log('---------------------------------------------------------------------------------');
        console.log(error.response.data)
        console.log('---------------------------------------------------------------------------------');
      })
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