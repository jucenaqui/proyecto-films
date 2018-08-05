"use strict"

var config = require('./config');
var mongoose = require("mongoose");
var app = require('./app');
var puerto = process.env.Port || config.puerto;

mongoose.connect("mongodb://sa:julio123@ds213612.mlab.com:13612/proyecto-films", (err, response) => {
    if (err) {
        throw new Error("fallo la coneccion " + err);
    } else {
        console.log("conectado correctamente a la db");
      debugger
        app.listen(puerto, () => {

            console.log("escuchando en el puerto " + puerto + " ve a http://localhost:" + puerto + "/");
        })
    }

})