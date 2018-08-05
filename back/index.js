"use strict"

var mongoose = require("mongoose");
var app = require('./app');
var puerto = process.env.Port || 4000;

mongoose.connect("mongodb://sa:sa123.@ds263520.mlab.com:63520/storeprueba", (err, response) => {
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