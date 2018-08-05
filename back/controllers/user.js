'use strict'

var bcrypt = require('bcrypt-nodejs');
var user = require('../models/user');
var jwt = require('../services/jwt');
var fs = require('fs');
var path = require('path');

function ensayo(req, res) {
    res.status(200).send({
        message: "peticion con autorizacion correcta"
    });
}

function saveUser(req, res) {

    var User = new user();
    var params = req.body;

    User.name = params.name;
    User.email = params.email;
    User.image = "Null";
    
    if ((User.name == null || User.name == "") || (User.email == null || User.email == "")) {
        res.status(500).send({
            message: "Todos los campos son requeridos"
        });
    }

    if (params.password) {

        user.findOne({email: User.email}, (err, user) => {
            if(err){
                res.status(500).send({
                    message: 'No se pudo realizar la consulta intente nuevamente...'
                });
            }else{
                if(user){
                    res.status(500).send({
                        message: 'El usuario ya se encuentra registrado'
                    });
                }else{

                    bcrypt.hash(params.password, null, null, (err, hash) => {
                        if (err) {
                            res.status(500).send({
                                message: 'No se pudo generar hash para la contraseña intente nuevamente...'
                            });
                        } else {
                            User.password = hash;
                            User.save((err, UserStorage) => {
                                if (err) {
                                    return res.status(500).send({
                                        message: "el Usuario no se pudo crear intente nuevamente..."
                                    });
                                }
                                res.status(200).send({
                                    user: UserStorage._doc
                                })
                            });
                        }
                    });
                }
            }
        });
        
    } else {
        res.status(500).send({
            message: "Por favor ingresa la contraseña..."
        });
    }

};

function users(req, res) {

    user.find((err, users) => {
        if (err) {
            res.status(500).send({
                message: "error en la consulta verifique..."
            })
        } else {
            if (!users) {
                res.status(400).send({
                    message: "no hay usuarios registrados"
                })
            } else {
                res.status(200).send({
                    users
                })
            }
        }
    })
}

function loginUser(req, res) {

    var params = req.body;

    var email = params.email;
    var password = params.password;

    /// se verifica que email y password no vengan vacios
    if (!email || !password) {
        res.status(200).send({
            message: "email y password son requeridos intente nuevamente... "
        });
    }

    // se busca el usuario filtrando por el email que viene de la req
    user.findOne({
        email: email
    }, (err, user) => {
        if (err) {
            res.status(500).send({
                message: "error en la peticion"
            });
        } else {
            if (!user) {
                res.status(400).send({
                    message: "el usario no existe en la base de datos"
                });
            } else {
                // comprueba que la contraseñas sean iguales 
                bcrypt.compare(password, user.password, (err, correct) => {
                    if (correct) {

                        // devuelve los datos del usuario logeado
                        if (params.getHash) {

                            // devuelve token con datos de usuario logeado con jwt
                            res.status(200).send({
                                token: jwt.createToken(user)
                            });

                        } else {
                            res.status(200).send({
                                user
                            });
                        }
                    } else {
                        res.status(404).send({
                            message: "contraseña incorrecta"
                        });
                    }
                });
            }
        }

    });

};

function updateUser(req, res) {
    
    var userId = req.params.id;
    var params = req.body;

    user.findByIdAndUpdate(userId, params, (err, userUpdate) => {
        if (err) {
            res.status(500).send({
                message: "error al actualizar el usuario"
            });
        } else {
            if (!userUpdate) {
                res.status(404).send({
                    message: "el usuario no existe en la base de datos"
                });
            } else {
                res.status(200).send({
                    user: userUpdate
                });
            }
        }
    });
};

function uploadImageUser(req, res) {
    var userId = req.params.id;
    var file_name = 'no image';

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];
        var file_ext = file_name.split('.')[1];

        if (file_ext == 'jpg' || file_ext == 'png' || file_ext == 'jpeg') {
            user.findByIdAndUpdate(userId, {
                image: file_name
            }, (err, userUpdate) => {
                if (userUpdate) {
                    res.status(200).send({
                        image: file_name,
                        user: userUpdate
                    });
                } else {
                    //res.status(404).send({message:'no se pudo actualizar la imagen..'});
                    res.status(404).send({
                        message: "no se pudo actualizar la imagen intente nuevamente"
                    });
                }
            });
        } else {
            res.status(200).send({
                message: 'formato de imagen invalido...'
            });
        }

    } else {
        res.status(200).send({
            message: 'no se ha subido ninguna imagen'
        });
    }

};

function getImageFile(req, res) {
    var imageFile = req.params.imageFile;

    if (imageFile) {
        var rutaFile = './uploads/users/' + imageFile;
        fs.exists(rutaFile, (exist) => {
            if (exist) {
                res.sendFile(path.resolve(rutaFile));
            } else {
                res.status(404).send({
                    message: 'la imagen no existe'
                });
            }
        });
    } else {
        res.status(500).send({
            message: 'No se ingreso un nombre de imagen valido'
        })
    }

};

module.exports = {
    saveUser,
    loginUser,
    ensayo,
    updateUser,
    uploadImageUser,
    getImageFile,
    users

};