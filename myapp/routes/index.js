var express = require('express');
var router = express.Router();
require('dotenv').config();

let students = new Array(210);

const mysql = require("mysql");

var connection = mysql.createConnection({
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    user:process.env.DB_USER ,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE
});

connection.connect();

//나중엔 DB에서 값 가져오기
let student = 0;
router.get('/', function(req, res, next) { c
  console.log('get success');
  res.render('index', {student: student});
});


router.post('/', function(req,res,next) {
  console.log('post success');
  connection.query("SELECT * FROM student", function(error, results, fields) {
    console.log(results[0].number);
    res.send(results[0].number);
  });
  connection.query("SELECT students FROM student", function(error, results, fields) {
    console.log(results[0].check);
  });
  console.log('post end');
});

module.exports = router;
 