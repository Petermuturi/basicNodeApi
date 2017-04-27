// Import modules from NPM registry
var express = require('express');
var router = express.Router();

// local imports
var Person = require('../models/person');

// GET home route: /api/
router.get('/', (req, res) => {
  res.send("Hello World");
});

// GET /api/data
router.get('/data', (req, res) => {
  Person.find({}, (err, person) => {
    if (err) throw err;
    res.json(person);
  })

})

//POST /api/data
router.post('/data', (req, res) => {
  var person = new Person();
  person.name = req.body.name;
  person.occupation = req.body.occupation;

  // create a new person
  Person.create(person, (err, persons) => {
    if (err) {
      throw err;
    } else {
      // check if that person already exists
      var query = Person.findOne({ "name": person.name });
      if (!query) {
        console.log(`Person saved successfully ${persons}`);
        res.redirect('/api/data');
      } else {
        console.log("Person already exists");
        res.redirect('/api')
      }

    }
  })

});


// Modules for export
module.exports = router;
