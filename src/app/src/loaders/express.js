const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('../api/index.js');
const { rpc } = require('../config/index.js')['ethereum'];
const { prefix } = require('../config/index.js')['api'];

module.exports.init = async function (app){
  app.use('/', express.static('public'));
  app.get('/status', (req, res) => { res.status(200).end(); });
  app.head('/status', (req, res) => { res.status(200).end(); });
  app.enable('trust proxy');

  app.use(cors());

  // parse application/json
  app.use(bodyParser.json());
  
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));

  // set api router
  app.use(prefix, routes());

  // ...more middlewares

};