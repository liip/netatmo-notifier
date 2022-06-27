require("dotenv").config();
const axios = require("axios");
const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK;

class Slack {

  /**
   * @constructor
   */
  constructor() {
  }

  /**
   * Send message on slack channel
   * @param msg
   */
  sendMessage(msg) {
    axios.post(SLACK_WEBHOOK, {"text": msg})
      .then(function (response) {
        console.log("Message was successfully sent to slack");
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

module.exports = Slack;