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
  console.log(event)
  // console.log("======================================================================")
  if (event.message.type == "text") {
    infos.forEach(function(value, index) {
      console.log(value.content)
      console.log(index)
      console.log(String(event.message.text).includes(value.content))
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
      const reoplayMessage = {
        type: 'text',
        text: message.message[0].replay
      }
      // let hello = async() => {
      //   const resp = await getData(event.message.text);
      //   console.log(resp);
      //   return "success"
      // };
      // hello().then((value) => console.log(value))
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