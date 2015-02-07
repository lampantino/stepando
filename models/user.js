var mongoose = require('mongoose');

// create a new schema for users
var userSchema = new mongoose.Schema({
  id: String,
  username: String,
  password: String,
  email: String,
  firstName: String,
  lastName: String
});

// export the schema
module.exports = mongoose.model('User', userSchema);
