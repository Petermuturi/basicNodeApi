// Import modules from NPM Registry
var express = require('express');
var bodyParser = require('body-parser');


// create express app
var app = express();


// Set default port
var port = process.env.PORT || 4000;

// basic routes
app.get('/', (req, res) =>{
	res.send("Hello world");
})


// start server
app.listen(port, () => {
	console.log("Server running on http://localhost:"+port);
})