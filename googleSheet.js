
const { GoogleSpreadsheet } = require('google-spreadsheet');
const message = require("./lineMessage.json");
const infos = message.message

const sheetInfo = require("./googleSheet.json");

/*
 * @param  {String} docID the document ID
 * @param  {String} sheetID the google sheet table ID
 * @param  {String} credentialsPath the credentials path defalt is './credentials.json'
 */

const docID = sheetInfo.docID
const credentialsPath = sheetInfo.credentialsPath
const sheetID = sheetInfo.sheetID

async function getData(writeInfo, index) {
    const result = [];
    const doc = new GoogleSpreadsheet(docID);
    const creds = require(credentialsPath);
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();
    console.log(index)

    // append rows
    if (index === 0) {
        const sheet = doc.sheetsById[0]
        await sheet.addRow({ info: writeInfo });
    }
    if (index === 1) {
        const sheet = doc.sheetsById[1508391675]
        await sheet.addRow({ info: writeInfo });
    }
    
    const rows = await sheet.getRows(); // can pass in { limit, offset }
};




module.exports = {

    getData,
};