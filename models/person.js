var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create person schema
var PersonSchema = new Schema({
  name: String,
  occupation: String
});

module.exports = mongoose.model('Person', PersonSchema);