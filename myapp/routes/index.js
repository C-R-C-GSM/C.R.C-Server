var express = require('express');
var router = express.Router();

//데이터 받아서 프론트에 보내주기


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
