'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const { optionsExpress } = require('../config/config');
const app = express();

const start = () => {
  return new Promise((resolve) => {
      app.use(bodyParser.json())
      require('../api/api')(app);
      const server = app.listen(optionsExpress.port, () => {
        console.log("Servidor ejecutandose en el puerto: " + optionsExpress.port);
        resolve(server);
      })
  })
}

module.exports = { start };