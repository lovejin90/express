const data = require("./data");

function getLottoNumber() {
    let lastNum = 0;
    data.lastLottoNum((row) => {
        lastNum = (parseInt(JSON.stringify(row[0].lastIdx)) > 0) ? (parseInt(JSON.stringify(row[0].lastIdx)) + 1) : 1;
        data.getLotto(lastNum, (row) =>{
            if (row.returnValue == 'success') {
                data.insertLottoNumber(row);
            }
        });
    });
};

module.exports = {
    getLottoNumber
};