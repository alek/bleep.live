var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');

// -- tbd --
router.get('/', function(req, res, next) {
    	res.write(req.query)
    	res.end()
});

module.exports = router;
