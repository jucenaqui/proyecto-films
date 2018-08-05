'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var peopleSchema = Schema({
    name: String,
    gender: String,
    age: String,
    eye_color: String,
    hair_color: String,
    film: { type: Schema.ObjectId, ref:'Films' }
    
});

module.exports = mongoose.model('People',peopleSchema);
