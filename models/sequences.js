var mongoose = require('mongoose');

//Creamos un nuevo esquema para las secuencias
var sequenceSchema = new mongoose.Schema({
    userId : String,
    lastUpdate : Date,
    version : String,
    donation : {
        bitcoin : String,
        paypal : String,
        flattr : String,
        gittip : String
    },
    rating : {
        votes : Number,
        positive : Number
    },
    title : String,
    info : String,
    steps : [{
        reference : String,
        question : String,
        type : String,
        option : String,
        nextStep : String,
        info : String
    }],
    result : {
        variables : [String],
        functions : [String],
        info : String
    }
});

//Exportamos este nuevo esquema de secuencias denominándolo 'sequences'
module.exports = mongoose.model('sequences', sequenceSchema);