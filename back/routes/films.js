'use strict'

var express = require('express');
var filmsController = require('../controllers/films'); 

var route = express.Router();

// routes
route.get('/films', filmsController.films);
route.get('/film/:id', filmsController.getFilm);
route.post('/films', filmsController.saveFilm);
route.delete('/film/:id', filmsController.deleteFilm);
route.put('/film/:id', filmsController.updateFilm);

module.exports = route;