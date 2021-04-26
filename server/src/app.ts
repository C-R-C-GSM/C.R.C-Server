import express, { Request, Response, NextFunction } from "express";

const app = express();

require('dotenv').config();

let meal = "";

let meal_text;
let meal_text_split = new Array();
let school_meal_arr = new Array();

interface Data {
    err: string
}

//#region  socket io
// const socketapp = require('express'); 
// const http = require('http').Server(socketapp); 
// const io = require('socket.io')(http);
// const room = io.of('/test');

// http.listen(9000, function () { console.log('Listening on *:9000'); });
//#endregion

const mysql = require("mysql");

var bodyParser = require('body-parser');
var client = require('cheerio-httpcli');

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

app.get("/", (request: Request, response: Response, next: NextFunction) => {
  response.send("ts");
});

app.listen(3000, () => {
  console.log("start");
});