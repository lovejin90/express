const sqlite3 = require('sqlite3');

const db = new sqlite3.Database("c:\\react\\express\\data\\hotdeal_alarm.db", err => {
//const db = new sqlite3.Database("https://ff.ggoyo.com/fd8ef0d", err => {
    if(err) {
        return console.error(err.message);
    }
    console.log("Successful connection to the database 'hotdeal.db'");
});
module.exports = db;