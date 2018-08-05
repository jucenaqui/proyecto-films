'use strict'

var express = require('express');

var route = express.Router();

route.get('/films',(req,res)=>{
    return res.status(200).send({message:"exito en la peticion"});
});

module.exports = route;