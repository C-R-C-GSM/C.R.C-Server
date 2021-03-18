var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  console.log('get success');
  res.render('index', { title: 'Express' });
  
});

module.exports = router;
 