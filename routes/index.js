var express = require('express');
var router = express.Router();

const path = require("path");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express1' });
});

module.exports = router;
