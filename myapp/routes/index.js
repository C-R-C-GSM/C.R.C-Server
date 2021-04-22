var express = require('express');
var router = express.Router();

require('dotenv').config();

var bodyParser = require('body-parser');  //python에서 json파일 보내주느라 사용
var client = require('cheerio-httpcli');
var urlType = require('url');
var param = {};
var url = "http://gsm.gen.hs.kr/xboard/board.php?tbnum=8";

//#region 
//socket io
io = require('socket.io')();
 
io.on('connection', function(socket){
  socket.broadcast.emit('hi');
});
//#endregion

//let meal = new Array(31);
let meal = "";
const mysql = require("mysql");
//const app = require('../app');

var connection = mysql.createConnection({
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    user:process.env.DB_USER ,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE
});
num = 5;

connection.connect();
    
let meal_text;
let meal_text_split = new Array();
let arr = new Array();
count = 0;

//I thought nodejs crawling is very hard.. so later, I will solve that
client.fetch("http://gsm.gen.hs.kr/xboard/board.php?tbnum=8", {}, function (err, $, res, body) {
//success selector 4/5 all meals

//#region use for crawling
for (let week = 2; week <= 6; week++) {
  for (let day = 2; day <= 6; day++) {
    meal_text = $(`#xb_fm_list > div.calendar > ul:nth-child(${week}) > li:nth-child(${day}) > div > div.slider_food_list`).text();
    meal_text = meal_text.replace(/\t/g,"");
    meal_text = meal_text.replace(/\r/g,"");
    meal_text = meal_text.replace(/\n\n\n\n\n\n\n/g,"day");
    meal_text = meal_text.replace(/\n/g,"");
    meal_text_split = meal_text.split("day");
    //console.log(meal_text_split)
    arr.push(meal_text_split[0]);
    arr.push(meal_text_split[1]);
    arr.push(meal_text_split[2]);
    // console.log(arr[count]);
  }
}
//#endregion

//let webcrawling = $(`#xb_fm_list > div.calendar > ul:nth-child(${3}) > li:nth-child(${3}) > div > div.slider_food_list`).text();
//arr = webcrawling.split('"\n"');
//arr[0] = arr[0].replace(/\t/g,"");
//arr[0] = arr[0].replace(/\r/g,"");
//arr[0] = arr[0].replace(/\n/g,"");
console.log(arr[10]);
});


//나중엔 DB에서 값 가져오기
let student = 30;  //if문에 사용되기 위한 변수.

router.get('/', function(req, res, next) {
  console.log('get success');
  //res.json({student:student});
  
  res.json({meal});
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
 