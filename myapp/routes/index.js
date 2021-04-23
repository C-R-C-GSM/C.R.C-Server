var express = require('express');
var router = express.Router();

require('dotenv').config();

var bodyParser = require('body-parser');
var client = require('cheerio-httpcli');




//#region  socket io
const app = require('express'); 
const http = require('http').Server(app); 
const io = require('socket.io')(http);
const room = io.of('/test');

http.listen(9000, function () { console.log('Listening on *:9000'); });
//#endregion

const mysql = require("mysql");

var connection = mysql.createConnection({
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    user:process.env.DB_USER ,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE
});
num = 5;

connection.connect();

let meal = "";

let meal_text;
let meal_text_split = new Array();
let school_meal_arr = new Array();
function IWantSchoolMeal(num,when) {
  if(when == 'morning') {
    return num*3+1+6;
  }
  else if(when == 'lunch') {
    return num*3+2+6;
  }
  else {
    return num*3+3+6;
  }
  
}

client.fetch("http://gsm.gen.hs.kr/xboard/board.php?tbnum=8", {}, function (err, $, res, body) {

  for (let week = 2; week <= 6; week++) {
    for (let day = 2; day <= 6; day++) {
      meal_text = $(`#xb_fm_list > div.calendar > ul:nth-child(${3}) > li:nth-child(${day}) > div > div.slider_food_list`).text();

      meal_text = meal_text.replace(/\t/g,"");
      meal_text = meal_text.replace(/\r/g,"");
      meal_text = meal_text.replace(/\n\n\n\n\n\n\n/g,"day");
      meal_text = meal_text.replace(/\n/g,"");

      meal_text_split = meal_text.split("day");

      school_meal_arr.push(meal_text_split[0]);
      school_meal_arr.push(meal_text_split[1]);
      school_meal_arr.push(meal_text_split[2]);
    }
  }
  console.log(school_meal_arr);
});

//나중엔 DB에서 값 가져오기
let student = 30;

router.get('/', function(req, res, next) {
  console.log('get success');
  res.json({student:student});
  //res.json({meal});
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
//  connection.query("INSERT INTO students(check) VALUE('"+true+"'", function(error, results, fields) {
//    if(error) {
//      console.log(error);
//    }
//  });
});

module.exports = router;
 