var mongoose = require('mongoose');
var config = require('./config');

// use global promise
mongoose.Promise = global.Promise;

// create mongoose callback
var callback = (err, db) => {
  if (err) throw err;
  console.log(`Successfully connected to ${config.db}`);
};

// module for export
module.exports = {
  mongoose: mongoose.connect(config.db, callback)

};




