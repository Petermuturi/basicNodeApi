var mongoose = require('mongoose');
var config = require('./config');

// use global promise
mongoose.Promise = global.Promise;
module.exports = {
  mongoose: mongoose.connect(config.db, (err, db) => {
    if (err) throw err;
    console.log(`Successfully connected to ${config.db}`);
  })

};




