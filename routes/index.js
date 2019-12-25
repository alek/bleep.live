var express = require('express');
const fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('homepage', { });
});

router.get('/client', function(req, res, next) {
  res.render('client', { });
});

router.get('/controller', function(req, res, next) {
  res.render('controller', { });
});

router.post('/recorder', function(req, res, next) {
	try {
		fs.writeFile('out/' + new Date().getTime() + ".svg", req.body['data'], (err) => {
		    if (err) throw err;
    		res.render('controller', { });
		});
	} catch (error) {
		console.log(error)
	}
});

module.exports = router;
