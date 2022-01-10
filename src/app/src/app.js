const loaders = require('./loaders/index.js');
const express = require('express');
const { host, port } = require('./config/index.js')['express'];

async function startServer() {

  const app = express();

  await loaders.init(app);

  app.listen(port, err => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Running node.js server on http://${host}:${port}`);
  });
}

startServer();