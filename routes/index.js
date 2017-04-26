// Import modules from NPM registry
var express = require('express');
var router = express.Router();

// GET home route
router.get('/', (req, res) => {
  res.send("Hello World");
});


// Modules for export
module.exports = router;
