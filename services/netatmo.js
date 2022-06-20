const util = require('util');
const qs = require('qs');
const axios = require('axios');
const BASE_URL = 'https://api.netatmo.net';

/**
 * @constructor
 * @param args
 * @param webhook
 */
var netatmo = function (args, webhook) {

	const data = {
		client_id: args.client_id,
		client_secret: args.client_secret,
		username: args.username,
		password: args.password,
		scope: args.scope,
		grant_type: args.grant_type,
	};

	var url = util.format('%s/oauth2/token', BASE_URL);

	const options = {
		method: 'POST',
		headers: { 'content-type': 'application/x-www-form-urlencoded' },
		data: qs.stringify(data),
		url,
	};

	axios(options)
		.then(function (response) {
			console.log(response.data);

			var access_token = response.data.access_token;
			var url = util.format('%s/api/addwebhook', BASE_URL);

			const options = {
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${access_token}`
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
};

module.exports = netatmo;