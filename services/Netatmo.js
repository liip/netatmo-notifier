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
   * @param args
   * @param webhook
   */
  addWebhook(args, webhook) {
    const data = {
      client_id: args.client_id,
      client_secret: args.client_secret,
      username: args.username,
      password: args.password,
      scope: args.scope,
      grant_type: args.grant_type,
    };

    let url = util.format("%s/oauth2/token", BASE_URL);

    const options = {
      method: "POST",
      headers: {"content-type": "application/x-www-form-urlencoded"},
      data: qs.stringify(data),
      url,
    };

    axios(options)
      .then(function (response) {
        console.log(response.data);

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
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

module.exports = Netatmo;