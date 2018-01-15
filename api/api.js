const { getHeroe, getAllHeroes } = require('../repository/repositoryMongo');
const { getTwits } = require('../service/serviceTwiter');
/*istanbul ignore next*/
module.exports = function (app) {
  app.get('/heroe/:heroe', (req, res) => { getHeroe(req, res) });
  app.get('/twits/:heroe', (req, res) => { getTwits(req, res) });
  app.get('/heroes', (req, res) => { getAllHeroes(req, res) });

  app.get('/*', (req, res) => {
    res.send('Bienvenido al ejemplo');
  });

};