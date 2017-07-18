# viking-garage-frontend
VIKING GARAGE app

[![Build Status](https://travis-ci.org/michalmikolajczyk/viking-garage-frontend.svg?branch=master)](https://travis-ci.org/michalmikolajczyk/viking-garage-frontend)

## Get teh codez
```
git clone git@github.com:michalmikolajczyk/viking-garage-frontend.git
cd viking-garage-frontend
```

## Local Docker setup
1. Make sure you have docker installed and running on your local machine.
2. `scripts/docker-setup-local.sh`
3. Access the app via your (i.e. the host's) localhost, port 3000

## Local setup w/o Docker
```
scripts/setup.sh
```

## Config
To run application you have to set env vars. Check `app.json` for required variables and default values. For local build you can create `.env` file in root directory with variables (for details check out [dotenv](https://github.com/motdotla/dotenv))

## Install
```
npm i
```

## Starting the app
```
npm start
```
You can now access the app through your localhost, default port: 3000.

## Deployment

Please look into Heroku Pipelines
Docker - Travis CI - Github - Heroku Pipeline - Review - Development - Staging - Production

## Logs
Application use [debug](https://github.com/visionmedia/debug) (npm module) for logs on client & server side (checkout link for docs)
To enable logs from the production server, set env var `DEBUG=server`
To enable logs from the app on client side, set in a `localStorage`:
```
localStorage.setItem('debug', 'app:*')
```
To add logger to a new module:
```
import debug from 'debug';
const log = debug('app:NameOfModule');
log('goes to stdout with prefix "app:NameOfModule"');
```
