'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FilmsSchema = Schema({
    title: String,
    description: String,
    director: String,
    producer: String,
    release_date: Date,
    rt_score: Number
});

module.exports = mongoose.model('Films',FilmsSchema);