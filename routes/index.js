// Import modules from NPM registry
var express = require('express');
var router = express.Router();

// GET home route: /api/
router.get('/', (req, res) => {
  res.send("Hello World");
});

// GET /api/data
router.get('/data', (req, res) => {
  res.send('data');
})

//POST /api/data
router.post('/data', (req, res) => {
  // create dummy data
  
  // var dataObj = {
  //   name: "Harrison",
  //   occupation: "Coder"
  // } 

  // can be changed via POSTMAN
  var dataObj = {
    name: req.body.name,
    occupation: req.body.occupation
  }
  // respond with a json object
  res.json(dataObj);
  
});


// Modules for export
module.exports = router;
