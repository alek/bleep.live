//
// A simple proxy for the back end Sinatra service
//

var express = require('express');
var router = express.Router();
const request = require('request');

router.get('/commits', function(queryReq, queryRes, next) {
	request('http://localhost:4567/commits', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }
	  queryRes.send(res);
	});
});

router.get('/tree', function(queryReq, queryRes, next) {
	console.log(queryReq.query)
	var params = []

	var paramString = ""

	if (queryReq.query["commit"] != null) {
		params.push(["commit", queryReq.query["commit"]])		
	}

	if (queryReq.query["prefix"] != null) {
		params.push(["prefix", queryReq.query["prefix"]])		
	}

	if (params.length > 0) {
		paramString = "?"
		prefix = ""
		for (var i=0; i<params.length; i++) {
			paramString += prefix + params[i][0] + "=" + params[i][1]
			prefix = "&"
		}
	}

	request('http://localhost:4567/tree' + paramString, { json: true }, (err, res, body) => {
	  if (err) { 
	  	return console.log(err); 
	  }
	  queryRes.send(res);
	});

});


router.get('/file', function(queryReq, queryRes, next) {
	console.log(queryReq.query)
	var params = []

	var paramString = ""

	if (queryReq.query["start"] != null) {
		params.push(["start", queryReq.query["start"]])		
	}

	if (queryReq.query["limit"] != null) {
		params.push(["limit", queryReq.query["limit"]])		
	}

	if (params.length > 0) {
		paramString = "?"
		prefix = ""
		for (var i=0; i<params.length; i++) {
			paramString += prefix + params[i][0] + "=" + params[i][1]
			prefix = "&"
		}
	}

	request('http://localhost:4567/file' + paramString, { json: true }, (err, res, body) => {
	  if (err) { 
	  	return console.log(err); 
	  }
	  queryRes.send(res);
	});

});


module.exports = router;
