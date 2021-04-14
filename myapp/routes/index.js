var express = require('express');
var router = express.Router();

require('dotenv').config();

var bodyParser = require('body-parser');  //python에서 json파일 보내주느라 사용
var client = require('cheerio-httpcli');
var urlType = require('url');
//var cheerio = require('cheerio');
var param = {};
var url = "http://gsm.gen.hs.kr/xboard/board.php?tbnum=8";


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
    
let meals = new Array(31);
let arr = new Array(50);
let week = 2;
let day = 2;
let food;
count = 0;
client.fetch("http://gsm.gen.hs.kr/xboard/board.php?tbnum=8", {}, function (err, $, res, body) {
//  var list = $("#xb_fm_list > div.calendar > ul:nth-child(3) > li:nth-child(2) > div");
//success selector 4/5 all meals

const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;

const getHtml = async () => {
  try {
    return await axios.get("http://gsm.gen.hs.kr/xboard/board.php?tbnum=8");
  } catch (error) {
    console.error(error);
  }
};

getHtml()
  .then(html => {
    let webc;
    const $ = cheerio.load(html.data);
    const $bodyList = $("#xb_fm_list > div.calendar > ul:nth-child(3) > li:nth-child(2) > div > div.slider_food_list.slider_food5.cycle-slideshow");

    $bodyList.each(function(i, elem) {
      webc= $(this).find('div.slider_list').text()
    });
    return webc;
  })
  .then(res => log(res));

// let web = $(`#xb_fm_list > div.calendar > ul:nth-child(4) > li:nth-child(3) > div > div.slider_food_list`).text();
// console.log(web); 
// for (; week <= 6; week++) {
//   for (; day <= 6; day++) {
//     arr[count] = $(`#xb_fm_list > div.calendar > ul:nth-child(${week}) > li:nth-child(${day}) > div > div.slider_food_list`).text();
//     // console.log(arr[count]);
//     for (let index = 0; index < arr.length; index++) {
//       if(arr[index]=='\r\n') {
//         arr[index] = 0;
//       }
      
//     }
//   }
// }

// const text = arr.join('');
// console.log(text.replace('.', '@'));

// const set = new Set(arr);
// const uni = [...set];
// console.log(set);

//console.log(meals);  
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
 