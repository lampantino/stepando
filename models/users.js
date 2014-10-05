var mongoose = require('mongoose');

//Creamos un nuevo esquema para los usuarios
var usersSchema = new mongoose.Schema({
    name : String,
    surname : String,
    user : String,
    email : String,
    password : String
})

//Exportamos este nuevo esquema de usuarios denominándolo 'users'
module.exports = mongoose.model('users', usersSchema);