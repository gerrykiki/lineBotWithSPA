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
  console.log("======================================================================")
  if (event.message.type == "text") {
    if (String(event.message.text).includes(message.message[0].content)) {
      const reoplayMessage = {
        type: 'text',
        text: message.message[0].replay
      }
      client.pushMessage('Ua4eaa323e9f7d79817176e97ece34a67', reoplayMessage)
        .then(() => {
          console.log("success")
        })
        .catch((err) => {
          console.log(err)
        });
    }
  }
});


const lineBotParser = bot.parser();

app.post('/linewebhook', lineBotParser)

app.listen(port, () => {
  console.log(`LineBot webhook app listening at http://localhost:${port}`);
});

(async () => {
  const resp = await getData();
  console.log(resp);
})();