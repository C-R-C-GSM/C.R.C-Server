var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  console.log('웹툰보고싶다.');
});

module.exports = router;
