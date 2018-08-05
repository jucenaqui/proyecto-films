'use strict'

var film = require('../models/films');

// return the films from bd
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

// save the film
function saveFilm(req, res) {
    debugger
    var Film = new film();
    var params = req.body;

    Film.title = params.title;
    Film.description = params.description;
    Film.director = params.director;
    Film.producer = params.producer;
    Film.release_date = params.release_date;
    Film.rt_score = params.rt_score;

    Film.save((err, FilmStorage) => {
        if (err) {
            return res.status(500).send({
                message: "el Film no se pudo crear intente nuevamente..."
            });
        }
        debugger
        res.status(200).send({
            Film: FilmStorage
        })
    });
};

// delete film by id into request
function deleteFilm(req, res) {
    
    var filmId = req.params.id;
    film.findByIdAndRemove(filmId, (err, filmRemoved) => {
        if (err) {
            res.status(500).send({
                message: "error en la petición para eliminar el film"
            });
        } else {
            if (!filmRemoved) {
                res.status(404).send({
                    message: "el film no se pudo eliminar"
                });
            } else {
            
                res.status(200).send({
                    filmRemoved
                });      
            }
        }
    }); 
};

// update the film by id into request
function updateFilm(req, res) {
    
    var filmId = req.params.id;
    var params = req.body;

    film.findByIdAndUpdate(filmId, params, (err, filmUpdate) => {
        if (err) {
            res.status(500).send({
                message: "error al actualizar el film"
            });
        } else {
            if (!filmUpdate) {
                res.status(404).send({
                    message: "el film no existe en la base de datos"
                });
            } else {
                res.status(200).send({
                    user: filmUpdate
                });
            }
        }
    });
};

// return film by id into request
function getFilm(req, res) {
    
    var filmId = req.params.id;

    film.findById(filmId, (err, film) => {
        if (err) {
            res.status(500).send({
                message: "error en la consulta"
            });
        } else {
            if (!film) {
                res.status(404).send({
                    message: "el film no existe en la base de datos"
                });
            } else {
                res.status(200).send({
                    user: film
                });
            }
        }
    });
};


module.exports = {
    films,
    saveFilm,
    deleteFilm,
    updateFilm,
    getFilm
};