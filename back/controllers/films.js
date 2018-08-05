'use strict'

var film = require('../models/films');
var path = require('path');


function films(req, res) {

    film.find((err, Films) => {
        if (err) {
            res.status(500).send({
                message: "error en la consulta verifique"
            })
        } else {
            if (!Films) {
                res.status(400).send({
                    message: "no hay Films registrados"
                })
            } else {
                res.status(200).send({
                    Films
                })
            }
        }
    })
}


module.exports = {
    films
};