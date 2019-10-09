var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('brandgraph', { });
});

router.get('/client', function(req, res, next) {
  res.render('client', { });
});

router.get('/controller', function(req, res, next) {
  res.render('controller', { });
});

module.exports = router;
