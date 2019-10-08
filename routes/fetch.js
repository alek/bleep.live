var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
// router.get('/', function(req, res, next) {
// 	request('http://sketching-in-hardware.com/', function (error, response, body) {
//   	if (!error && response.statusCode == 200) {
//     	res.send(body)
//   	}
// 	});
// });


router.get('/', function(req, res, next) {
	console.log("requesting")
	request("http://api.findchips.com/v1/search?apiKey=m79wo9S4nrsxG&part=" + req.query.part + "&hostedOnly=true", function (error, response, body) {
  	if (!error && response.statusCode == 200) {
    	res.send(body)
  	} else {
  		console.log(error)
  	}
	});
});

module.exports = router;
