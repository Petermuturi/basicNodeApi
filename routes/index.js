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
  var namesArray = [];

  // create a new person
  Person.create(person, (err, persons) => {
    if (err) {
      throw err;
    } else {
      // check if that person already exists
      _query().then((result) => {
        result.map((person) => {
          namesArray.push(person.name);
        })
        if (_isPresent(namesArray, person.name) === true) {
          console.log("user exist");
          res.redirect('/api');
        } else {
          console.log(`${person} saved to db`);
          res.redirect('/api/data');
        }
      });

    }
  })

});

// Update person
router.put('/data/:name', (req, res) => {
  var person = req.params.name.toString();
  Person.findOne({ "name": person }, (err, result) => {
    if (err) {
      throw err;
    } else {
      let name = result.name;
      console.log(`${person} found`);
      
      // console.log(name);
      Person.update({ "name": name }, { $set: { "name": req.body.name } });
      res.json({
        message: `${name} changed to ${req.body.name}`
      })
      
    }

  });
})

// Delete person - find person by name
router.delete('/data/:name', (req, res) => {
  var person = req.params.name.toString();
  Person.remove({ "name": person }, (err, result) => {
    if (err) throw err;
    console.log(`${person} has been deleted!`);
    res.json({
      message: `${person} deleted`
    })
  })
})

// Private functions
function _query() {
  return new Promise((resolve, reject) => {
    Person.find({}, (err, person) => {
      if (err) {
        reject(err);
      } else {
        resolve(person);
      }
    })
  })
}

function _isPresent(arr, item) {
  arr.forEach((name) => {
    if (item == arr[name]) {
      return true;
    } else {
      return false;
    }
  })
}

// Modules for export
module.exports = router;
