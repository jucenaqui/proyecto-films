'use strict'

var express = require('express');
var config = require('../config');
var peopleController = require('../controllers/people'); 

var route = express.Router();

// routes
route.get('/people', peopleController.getPeople);
route.get('/people/:id', peopleController.getPeopleById);
route.post('/people', peopleController.savepeople);
route.delete('/people/:id', peopleController.deletepeople);
route.put('/people/:id', peopleController.updatepeople);

module.exports = route;