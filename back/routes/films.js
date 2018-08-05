'use strict'

var express = require('express');
var config = require('../config');
var filmsController = require('../controllers/films'); 

var route = express.Router();

// route.get('/films', filmsController.films);
route.get('/films', filmsController.films);

module.exports = route;