'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//const repositoryMongo = require('../repository/repositoryMongo');

const start = (optionsExpress) => {
  return new Promise((resolve, reject) => {
    app.use(bodyParser.json())
    require('../api/api')(app);
    const server = app.listen(optionsExpress.port, () => {
      console.log("Servidor ejecutandose en el puerto: " + optionsExpress.port);
      resolve(server);
    });
  })
}

module.exports = { start };