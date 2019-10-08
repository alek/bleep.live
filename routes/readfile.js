var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
	setInterval(function() {
		res.write("" + Math.random());
	},1)
});

module.exports = router;
