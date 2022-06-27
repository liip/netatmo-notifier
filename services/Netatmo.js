require("dotenv").config();
const util = require("util");
const qs = require("qs");
const axios = require("axios");
const BASE_URL = process.env.NETATMO_BASE_URL;

class Netatmo {

  /**
   * @constructor
   */
  constructor() {
  }

  /**
   * Add webhook
   * * @param webhook
   */
  addWebhook(webhook) {
    this.authenticate()
      .then(function (response) {
        let access_token = response.data.access_token;
        let url = util.format("%s/api/addwebhook", BASE_URL);

        const options = {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${access_token}`
          },
          data: {
            url: webhook
          },
          url,
        };

        axios(options)
          .then(function (response) {
            // console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  /**
   * Authenticate
   */
  authenticate() {
    const data = {
      client_id: process.env.NETATMO_CLIENT_ID,
      client_secret: process.env.NETATMO_CLIENT_SECRET,
      username: process.env.NETATMO_USERNAME,
      password: process.env.NETATMO_PASSWORD,
      scope: "read_smokedetector",
      grant_type: "password",
    };

    let url = util.format("%s/oauth2/token", BASE_URL);

    const options = {
      method: "POST",
      headers: {"content-type": "application/x-www-form-urlencoded"},
      data: qs.stringify(data),
      url,
    };

    return axios(options);
  }
}

module.exports = Netatmo;