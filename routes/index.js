var express = require('express');
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
		console.log(req.body['data'])
		res.render('controller', { });
	} catch (error) {
		console.log(error)
	}
});

module.exports = router;
