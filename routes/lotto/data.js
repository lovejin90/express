const mysql = require("mysql");
const db = require("../db");
const axios = require('axios');
require("dotenv").config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});
function connect() {
    const conn = mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
    });

    conn.connect(function (err) {
        if (err) return err;
    });

    return conn;
}
const getLotto = async (num,callback) => {
    try {
        const response = await axios.get('https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo='+num);
        // 외부 API에서 받은 데이터를 처리
        callback(response.data);
    } catch (error) {
        callback(error);
        //res.status(500).json({ error: 'External API call failed' });
    }
};

const lastLottoNum = async (callback) => {
    const conn = connect();
    const sql = "SELECT max(idx) as lastIdx FROM lotto limit 1";
    const list = [];
    let data = conn.query(sql, (error, rows, fields) => {
        if (error) return error;
        callback(rows);
    });
}
function insertLottoNumber(row) {
    const conn = connect();
    conn.query(
        `
         INSERT INTO lotto (idx, date, num1, num2, num3, num4, num5, num6, bnusNum, firstWinamnt, firstPrzwnerCo) VALUES
         (${row.drwNo},'${row.drwNoDate}',${row.drwtNo1},${row.drwtNo2},${row.drwtNo3},${row.drwtNo4},${row.drwtNo5},${row.drwtNo6},${row.bnusNo},${row.firstWinamnt},${row.firstPrzwnerCo} )
         `,
        (err, result) => {
            if (err) throw err;
        }
    );
}

module.exports = {
    getLotto,
    insertLottoNumber,
    lastLottoNum,
};
