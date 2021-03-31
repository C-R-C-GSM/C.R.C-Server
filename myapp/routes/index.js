var express = require('express');
var router = express.Router();
require('dotenv').config();
var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.json());

let students = new Array(210);

const mysql = require("mysql");
const app = require('../app');

var connection = mysql.createConnection({
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    user:process.env.DB_USER ,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE
});

connection.connect();

//let student = 0;
//나중엔 DB에서 값 가져오기
//학생의 count수

let num = 0;  //if문에 사용되기 위한 변수.

router.get('/', function(req, res, next) {
  console.log('get success');
  res.render('index', {student: student});  //페이지와 변수는 맨 처음에만 준다.
  num = student;
  while(TRUE) {
    if(student != num) {
      num = student;
      res.render({student: student}); //페이지는 이미 보내졌기 때문에 변수만 보낸다.
    } else {
      setTimeout(function() {}, 1000);
    }
  }

});

router.post('/', function(req,res,next) {
  num = req.body.counter;
  console.log(req.body);
  console.log('post success');
  /*  나중에 쓸 쿼리문
  connection.query("SELECT * FROM student", function(error, results, fields) {
    console.log(results[0].number);
    res.send(results[0].number);
  });
  connection.query("SELECT students FROM student", function(error, results, fields) {
    console.log(results[0].check);
  });
  */
  res.render('index', {num:num});  //페이지와 변수는 맨 처음에만 준다.
  console.log('post end');
});

module.exports = router;
 