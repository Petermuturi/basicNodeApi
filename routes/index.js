// Import modules from NPM registry
var express = require('express');
var router = express.Router();

// local imports
var Person = require('../models/person');

// GET home route: /api/
router.get('/', (req, res) => {
  res.send("<h1>Hello World!</h1> Add /data to view all persons");
});

// GET /api/data
router.get('/data', (req, res) => {
  _query().then((persons) => {
    res.json(persons);
  })

})

// GET one person by name: /api/data/:name
router.get('/data/:name', (req, res) => {
  var name = req.params.name.toString();
  var namesArray = [];

  _query().then((result) => {
    result.forEach((data) => {
      namesArray.push(data.name);
    })

    if (namesArray.includes(name) === true) {
      Person.findOne({ "name": name }, (err, person) => {
        if (err) throw err;
        res.json(person);
      })
    } else {
      res.json({
        message: `${name} doesn't exist`
      })
    }
  })


})

//POST /api/data
router.post('/data', (req, res) => {
  var person = new Person();
  person.name = req.body.name;
  person.occupation = req.body.occupation;
  var namesArray = [];


  // check if that person already exists
  _query().then((result) => {
    result.forEach((data) => {
      namesArray.push(data.name);
    })
    if (namesArray.includes(person.name) === true) {
      console.log("user exists");
      res.json({
        message: `${person.name} already exists in the database!`
      });
    } else {
      // create a new person
      Person.create(person, (err, persons) => {
        if (err) throw err;
        console.log(`${person} saved to db`);
        res.redirect('/api/data');
      })
    }

  });
});

// Update person
router.put('/data/:name', (req, res) => {
  var personName = req.params.name.toString();
  Person.findOne({ "name": personName }, (err, person) => {
    if (err) throw err;
    console.log(`${person} found`);
    person.name = req.body.name;
    person.occupation = req.body.occupation;
    person.save((err, result) => {
      if (err) throw err;
      res.json({
        name: `${personName} changed to ${req.body.name}`,
        occupation: `Occupation changed to ${req.body.occupation}`,
      })

    });

  });
})

// Delete person - find person by name
router.delete('/data/:name', (req, res) => {
  var person = req.params.name.toString();
  var namesArray = [];

  // check if that person already exists
  _query().then((result) => {
    result.forEach((data) => {
      namesArray.push(data.name);
    })
    if (namesArray.includes(person) === true) {
      Person.remove({ "name": person }, (err, result) => {
        if (err) throw err;
        console.log(`${person} has been deleted!`);
        res.json({
          message: `${person} deleted`
        })
      })
    } else {
      console.log("Person doesn't exist");
      res.json({
        message: `${person} doesn't exist `
      })
    }
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

// Modules for export
module.exports = router;
