
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
    
    // const moreRows = await sheet.addRows([
    //     { name: 'Sergey Brinaaaa', email: 'sergey@google.com' },
    //     { name: 'Eric Schmidddddddt', email: 'eric@google.com' },
    // ]);

    // read rows
    const rows = await sheet.getRows(); // can pass in { limit, offset }

    // read/write row values
    // console.log(rows[0].name); // 'Larry Page'
    // rows[1].email = 'sergey@abc.xyz'; // update a value
    // await rows[1].save(); // save updates
    // const rows = await sheet.getRows();
    // rows[rows.length + 1] = writeInfo
    // // await rows[rows.length + 1].save()
    // for (row of rows) {
    //     result.push(row.);
    // }
    // return result;
};




module.exports = {

    getData,
};