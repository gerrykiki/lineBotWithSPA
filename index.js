// 引用linebot SDK
const express = require("express");
const linebot = require('linebot');
const axios = require('axios');
const app = express();
const port = 3000;
const package = require("./linebot.json");
const message = require("./lineMessage.json");
const channelId = package.channelId
const channelSecret = package.channelSecret
const token = package.channelAccessToken
const { getData } = require('./googleSheet.js');
const infos = message.message
const custom = message.custom


const line = require('@line/bot-sdk');

const client = new line.Client({
  channelAccessToken: token
});

const bot = linebot({
  channelId: channelId,
  channelSecret: channelSecret,
  channelAccessToken: token
});


bot.on('message', function (event) {
  console.log("Success")
  if (event.message.type == "text") {
    infos.forEach(function(value, index) {
      if (String(event.message.text).includes(value.content)) {
        console.log("success")
        let hello = async() => {
          const resp = await getData(event.message.text, index);
          console.log(resp);
          return "success"
        };
        hello().then((value) => console.log(value))
      }
    })

    custom.forEach(function(value, index){
      if (String(event.message.text).includes(value.name)) {
        event.reply(value.content).then(function (data) {
          // 當訊息成功回傳後的處理
        }).catch(function (error) {
          // 當訊息回傳失敗後的處理
        });
      }
    })
  }
});


const lineBotParser = bot.parser();

app.post('/linewebhook', lineBotParser)

app.listen(port, () => {
  console.log(`LineBot webhook app listening at http://localhost:${port}`);
});

// (async () => {
//   const resp = await getData("1");
//   console.log(resp);
// })();