const servidor = require('./server/server');
const { optionsExpress } = require('./config/config');

servidor.start(optionsExpress);