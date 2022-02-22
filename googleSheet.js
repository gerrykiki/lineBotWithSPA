
const { GoogleSpreadsheet } = require('google-spreadsheet');

const sheetInfo = require("./googleSheet.json");

/*
 * @param  {String} docID the document ID
 * @param  {String} sheetID the google sheet table ID
 * @param  {String} credentialsPath the credentials path defalt is './credentials.json'
 */

const docID = sheetInfo.docID
const credentialsPath = sheetInfo.credentialsPath
const sheetID = sheetInfo.sheetID

async function getData() {
    const result = [];
    const doc = new GoogleSpreadsheet(docID);
    const creds = require(credentialsPath);
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();
    const sheet = doc.sheetsById[sheetID];
    const rows = await sheet.getRows();
    for (row of rows) {
        console.log(row)
        result.push(row._rawData);
    }
    return result;
};

module.exports = {
    getData,
};