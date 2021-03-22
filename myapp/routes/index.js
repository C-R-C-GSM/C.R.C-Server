var express = require('express');
var router = express.Router();


let students = new Array(210);



router.get('/', function(req, res, next) {
  console.log('get success');
  res.render('index');
});


router.post('/', function(req,res,next) {
  console.log('post success');
  for (let index = 0; index < students.length; index++) {
    students[index] = req.body.scan;
    req.body.scan = null;
    console.log(students[index]);
    while(req.body.scan == null);
    console.log(students[index]);
  }
  console.log('post end');
});

module.exports = router;
 