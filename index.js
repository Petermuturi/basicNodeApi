// Import modules from NPM Registry
var express = require('express');
var bodyParser = require('body-parser');

// create express app
var app = express();

// local imports
var config = require('./config/config');
var mongoose = require('./config/database');
var routes = require('./routes/index');

// connect to database
var db = mongoose.connection;

// Set default port
var port = config.port || 4000;

// create application/json parser
app.use(bodyParser.json());

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true }));

// Service routes
app.use('/api', routes);

// start server
app.listen(port, () => {
	console.log("Server running on http://localhost:"+port);
})