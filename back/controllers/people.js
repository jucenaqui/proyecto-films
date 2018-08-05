
'use strict'

var people = require('../models/people');

// return the peoples from bd
function getPeople(req,res){

     people.find()
     .populate({
         path:'film'
     }).exec((err,People)=>{
        if(err){
            res.status(500).send({message:"error en la petición"+err});
        }else{
            if(!People){
                res.status(404).send({message:"no existen people en la base de datos"});
            }else{
                res.status(200).send({
                    People
                });
            }
        }
    });
};

function getPeopleById(req,res){

    var peopleId = req.params.id;
    people.findById(peopleId).populate({path:'film'}).exec((err,People)=>{
        if(err){
            res.status(500).send({message:"error en la petición"});
        }else{
            if(!People){
                res.status(404).send({message:"la people no existe en la base de datos"});
            }else{
                res.status(200).send({People});
            }
        }
    });
};



// save the people
function savepeople(req, res) {
    debugger
    var People = new people();
    var params = req.body;

    People.name = params.name;
    People.gender = params.gender;
    People.age = params.age;
    People.eye_color = params.eye_color;
    People.hair_color = params.hair_color;
    People.film = params.film;
   
    People.save((err, peopleStorage) => {
        if (err) {
            return res.status(500).send({
                message: "el people no se pudo crear intente nuevamente..."
            });
        }
        debugger
        res.status(200).send({
            people: peopleStorage
        })
    });
};

// delete people by id into request
function deletepeople(req, res) {
    
    var peopleId = req.params.id;
    people.findByIdAndRemove(peopleId, (err, peopleRemoved) => {
        if (err) {
            res.status(500).send({
                message: "error en la petición para eliminar el people"
            });
        } else {
            if (!peopleRemoved) {
                res.status(404).send({
                    message: "el people no se pudo eliminar"
                });
            } else {
            
                res.status(200).send({
                    peopleRemoved
                });      
            }
        }
    }); 
};

// update the people by id into request
function updatepeople(req, res) {
    
    var peopleId = req.params.id;
    var params = req.body;

    people.findByIdAndUpdate(peopleId, params, (err, peopleUpdate) => {
        if (err) {
            res.status(500).send({
                message: "error al actualizar el people"
            });
        } else {
            if (!peopleUpdate) {
                res.status(404).send({
                    message: "el people no existe en la base de datos"
                });
            } else {
                res.status(200).send({
                    user: peopleUpdate
                });
            }
        }
    });
};


module.exports = {
    savepeople,
    deletepeople,
    updatepeople,
    getPeople,
    getPeopleById

};