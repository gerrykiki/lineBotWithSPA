const line = require('@line/bot-sdk');
var express = require('express');

const package = require("./linebot.json");
const channelId = package.channelId
const channelSecret = package.channelSecret
const token = package.channelAccessToken

const app = express();
const message = require("./lineMessage.json");
const infos = message.message
const custom = message.custom

const { getData } = require('./googleSheet.js');



const client = new line.Client({
    channelId: channelId,
    channelSecret: channelSecret,
    channelAccessToken: token
});

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/message', line.middleware({
    channelId: channelId,
    channelSecret: channelSecret,
    channelAccessToken: token
}), (req, res) => {
    console.log(req, res)
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result))
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        });
});
// event handler
function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
        // ignore non-text-message event
        return Promise.resolve(null);
    }
    // // create a echoing text message
    // const echo = { type: 'text', text: event.message.text };
    // // use reply API
    // return client.replyMessage(event.replyToken, echo);
    if (event.message.type == "text") {
        infos.forEach(function (value, index) {
            if (String(event.message.text).includes(value.content)) {
                console.log("success")
                let hello = async () => {
                    const resp = await getData(event.message.text, index);
                    console.log(resp);
                    return "success"
                };
                hello().then((value) => console.log(value))
            }
        })

        custom.forEach(function (value, index) {
            if (String(event.message.text).includes(value.name)) {
                event.reply(value.content).then(function (data) {
                    // 當訊息成功回傳後的處理
                }).catch(function (error) {
                    // 當訊息回傳失敗後的處理
                });
            }
        })
    }
}
// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});