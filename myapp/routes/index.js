var express = require('express');
var router = express.Router();

require('dotenv').config();

var bodyParser = require('body-parser');  //python에서 json파일 보내주느라 사용

var client = require('cheerio-httpcli');
var urlType = require('url');
//크롤링을 위해 피요한 것

var cheerio = require('cheerio');
var request = require('request');
var url = "http://gsm.gen.hs.kr/xboard/board.php?tbnum=8";
var param = {};

let students = new Array(210);
let meal = new Array(31);
const mysql = require("mysql");
//const app = require('../app');

var connection = mysql.createConnection({
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    user:process.env.DB_USER ,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE
});

request(url, function (error, response, html){
  var $ = cheerio.load(html);
  for (let number = 5; number < num.length; number++) {
    meal[index] = $(`#xb_fm_list > div.calendar > ul:nth-child(2) > li:nth-child(${number}) > div > div.slider_food_list.slider_food1.cycle-slideshow > div.slider_list.cycle-slide.cycle-slide-active > div.content_info > span`).text();
  }

//console.log(region);

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
 });
});

module.exports = router;
 