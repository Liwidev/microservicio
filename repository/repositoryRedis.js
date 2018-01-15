'use strict';
const redis = require("redis");
const { optionsRedis } = require('../config/config');
const { promisify } = require('util');
let clienteRedis = undefined;

const cache = () => (new Promise((resolve, reject) => {
    /*istanbul ignore if*/
    if (clienteRedis) {
        console.log('Redis - Cacheado');
        return resolve(true);
    } else {
        console.log('Redis - Real');
        clienteRedis = redis.createClient(optionsRedis.port, optionsRedis.host);
        clienteRedis.auth('accentureBech', function () {
            console.log('Cliente autenticado existosamente');
        });
        clienteRedis.on('connect', function () {
            return resolve(false);
        })
    }
}));

const getFromCache = (id) => {
    return new Promise((resolve, reject) => {
        cache().then(
            () => {
                clienteRedis.get(id, function (err, value) {
                    (err) ? reject(err) : resolve(value);
                });
            }
        );
    });
}

const setInCache = (id, valor) => {
    return new Promise((resolve, reject) => {
        cache().then(
            () => {
                clienteRedis.set(id, valor, 'EX', optionsRedis.duracion, function (err, value) {
                    (err) ? reject(err) : resolve(value);
                });

            }
        )
    });
}

module.exports = { cache, getFromCache, setInCache }
