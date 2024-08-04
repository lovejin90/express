const mysql = require('mysql');
require('dotenv').config();

function connect() {
    const conn = mysql.createConnection({
        host : process.env.DB_HOST,
        port : process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    });

    conn.connect(function (err) {
        if(err) return err;
    });

    return conn;
}

function select(callback) {
    const conn = connect();
    const sql = "SELECT * FROM MEMOS ORDER BY ID DESC";
    conn.query(sql, (error, rows, fields) => {
    if (error) throw error;
        callback(rows);
    });
}

function insert(content, callback){
    const conn = connect();
    conn.query(`INSERT INTO MEMOS (CONTENT, CREATED_AT, UPDATED_AT) VALUES ('${content}',NOW(),NOW())`, (err, result) =>{
        if (err) throw err;
        callback();
    });
}

function getMemoById(id, callback){
    const conn = connect();
    conn.query(`SELECT * FROM MEMOS WHERE ID =${id}`, (err,row, fields) =>{
        if(err) throw err;
        callback(row);
    });
}

function updateMemoById(id, content , callback){
    const conn = connect();
    conn.query(`UPDATE MEMOS SET CONTENT='${content}', UPDATED_AT=NOW() WHERE ID=${id}`, (err, result) => {
        if(err) throw err;
        callback();
    });
}

function deleteMemoById(id, callback){
    const conn = connect();
    conn.query(`DELETE FROM MEMOS WHERE ID=${id}`, (err, result) =>{
        if(err) throw err;
        callback();
    });
}

module.exports = {
    connect,
    select,
    insert,
    getMemoById,
    updateMemoById,
    deleteMemoById

};