require('dotenv').config()
const axios = require('axios')
const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK
const SLACK_CHANNEL = process.env.SLACK_CHANNEL

class Slack {

  /**
   * @constructor
   */
  constructor() {
  }

  /**
   * Send message on Slack channel
   * @param msg
   */
  static sendMessage(msg) {
    axios.post(SLACK_WEBHOOK, {
      'channel': SLACK_CHANNEL,
      'text': msg,
    })
      .then(function () {
        console.log('Message was successfully sent to slack')
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

module.exports = Slack