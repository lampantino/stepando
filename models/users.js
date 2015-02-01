var mongoose = require('mongoose');

// create a new schema for users
var userSchema = new mongoose.Schema({
  name : String,
  password : String
});

// export the schema
module.exports = mongoose.model('user', userSchema);
