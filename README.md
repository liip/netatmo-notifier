# netatmo-notifier
[![GitHub license](https://img.shields.io/github/license/liip/netatmo-notifier)](https://github.com/liip/netatmo-notifier/blob/master/LICENSE) 

Allow us to be notified by SMS or Slack when there are alerts from Netatmo Smoke Alarms.  
Netatmo API Platform : https://dev.netatmo.com/
## Quickstart

### Clone repository
```shell
$ git clone https://github.com/liip/netatmo-notifier.git
```

### Install dependencies
```shell
$ npm install
```

### Setup environment variables
Copy `.env.default` to `.env`.
```shell
$ cp .env.default .env
```
Then open the file `.env` and fill-in the values.

1. Create an account on the Netatmo API plateforme to use `username` and `password`
2. Create a new app to use `client_id` and `client_secret`

### Run the server
```shell
$ npm start
```