'use strict'
const MongoClient = require('mongodb').MongoClient;
const { getFromCache, setInCache } = require('./repositoryRedis');
const { optionsMongo } = require('../config/config');
let clienteMongoDB = undefined;

const mongoDB = () => (new Promise((resolve, reject) => {
  //Validamos si el cliente esta cacheado, en caso que lo sea lo retornamos,
  //sino generamos uno nuevo
  if (clienteMongoDB) {
    console.log('MongoDB- Cacheado');
    return resolve();
  } else {
    console.log('MongoDB- Real');
    //Generamos el cliente Mongo
    MongoClient.connect(optionsMongo.urlMongoDB, (err, database) => {
      if (err) {
        //Retornamos error de conexion
        return reject(err);
      } else {
        //Seleccionamos la Base de Datos
        clienteMongoDB = database.db(optionsMongo.db);
        //Seleccionamos la colleccion de archivos
        clienteMongoDB = clienteMongoDB.collection(optionsMongo.collection)
        return resolve();
      }
    });
  }

}));

const getHeroe = (req, res) => {
  mongoDB().then(
    () => {
      const regex = new RegExp(["^", req.params.heroe, "$"].join(""), "i");
      clienteMongoDB.find({ "name.first": regex }).toArray(function (err, docs) {
        if (err) {
          res.send({ 'error': 'Un error ha ocurrido', 'info': err });
        } else {
          res.send(docs);
        }
      });
    }
  );

}

const getAllHeroes = (req, res) => {
  getFromCache('heroes').then(
    (response) => {
      if (response) {
        console.log('Datos - CACHE');
        return new Promise((resolve, reject) => resolve({ result: JSON.parse(response) }));
      } else {
        console.log('Datos - REAL');
        return mongoDB()
      }
    }
  ).then(
    (response) => {
      if (clienteMongoDB && !response) {
        return new Promise((resolve,reject) => {
          clienteMongoDB.find({}).toArray(function (err, docs) {
            if (err) {
              res.send({ 'error': 'Un error ha ocurrido', 'info': err });
            } else {
              setInCache('heroes', JSON.stringify(docs));
              resolve(docs);
            }
          })
        });
      } else {
        return new Promise((resolve, reject) => resolve(response.result));
      }
    }
    ).then(
    (response) => {
      res.send(response);
    }
    ).catch(
    (err) => {
      console.log({ error: err })
    }
    );


}

module.exports = { mongoDB, getHeroe, getAllHeroes }