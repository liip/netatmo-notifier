require('dotenv').config()

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const serviceSid = process.env.TWILIO_SERVICE_SID
const client = require('twilio')(accountSid, authToken)
const phonesString = process.env.TWILIO_PHONES

class Twilio {

  /**
   * @constructor
   */
  constructor() {
  }

  /**
   * Send sms
   * @param msg
   */
  static sendMessage(msg) {

    let phones = phonesString.split(',')

    phones.forEach(function (phone) {
      const notificationOpts = {
        toBinding: JSON.stringify({
          binding_type: 'sms',
          address: phone,
        }),
        body: msg,
      }

      client.notify
        .services(serviceSid)
        .notifications.create(notificationOpts)
        .then(function () {
          console.log(`SMS was successfully sent to ${phone}`)
        })
        .catch(error => console.log(error))
    })
  }
}

module.exports = Twilio