var express = require('express');
var router = express.Router();

require('dotenv').config();

var bodyParser = require('body-parser');  //python에서 json파일 보내주느라 사용


let students = new Array(210);

const mysql = require("mysql");
//const app = require('../app');

var connection = mysql.createConnection({
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    user:process.env.DB_USER ,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE
});

connection.connect();

//나중엔 DB에서 값 가져오기
let student = 30;  //if문에 사용되기 위한 변수.

router.get('/', function(req, res, next) {
  console.log('get success');
  res.json({student:student});
});

router.post('/', function(req,res,next) {
  student = req.body.counter;
  console.log(req.body.counter);
  console.log('post success');
  /*  나중에 쓸 쿼리문 1. 학생의 번호를 가져오는 쿼리문 2. 학생의 체크를 모두 가져오는 것
  connection.query("SELECT students FROM student", function(error, results, fields) {
    console.log(results[0].number);
    res.send(results[0].number);
  });
  connection.query("SELECT students FROM student", function(error, results, fields) {
    console.log(results[0].check);
  });
  */
 connection.query("INSERT INTO students(check) VALUE('"+true+"'", function(error, results, fields) {
   if(error) {
     console.log(error);
   }
 })
});

module.exports = router;
 