'use strict';
const request = require('request-promise-native');
const { optionsTwitter } = require('../config/config');

const getTwits = (req, res) => {
    const query = '?q=from%3A' + req.params.heroe + '%20OR%20%23' + req.params.heroe;
    const url = optionsTwitter.url+''+query;

    (request.get({ url: url, oauth: optionsTwitter, json: true })).then(
        (result) => {
            res.send({ status: 200, search: req.params.heroe, result: result })
        }
    ).catch(
        (err) => {
            res.status(500).send({ status: 500, search: req.params.heroe, err: err })
        }
        )

}

module.exports = { getTwits }
