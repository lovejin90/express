const mysql = require("mysql");
const db = require("../db");
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
const getMenuList = async (callback) => {
  const conn = connect();
  const sql = "SELECT * FROM menu ORDER BY idx DESC";
  const list = [];
  let data = conn.query(sql, (error, rows, fields) => {
    if (error) return error;
    callback(rows);
  });
};

function insertMemu(name, active_yn, url, callback) {
  const conn = connect();
  conn.query(
    `INSERT INTO menu (name, active_yn,url, regdate) VALUES ('${name}','${active_yn}','${url}',NOW())`,
    (err, result) => {
      if (err) throw err;
      callback();
    }
  );
}

function updateMemu(id, name, active_yn, url, callback) {
  const conn = connect();
  conn.query(
    `UPDATE menu SET name='${name}', active_yn='${active_yn}' , url='${url}', UPDATED_AT=NOW() WHERE idx=${id}`,
    (err, result) => {
      if (err) throw err;
      callback();
    }
  );
}

function deleteMemu(id, callback) {
  const conn = connect();
  conn.query(`DELETE FROM menu WHERE idx=${id}`, (err, result) => {
    if (err) throw err;
    callback();
  });
}

function updateStatus(id, active_yn, callback) {
  const conn = connect();
  conn.query(
      `UPDATE menu SET active_yn='${active_yn}', UPDATED_AT=NOW() WHERE idx=${id}`,
      (err, result) => {
        if (err) throw err;
        callback();
      }
  );
}


module.exports = {
  getMenuList,
  insertMemu,
  updateMemu,
  deleteMemu,
  updateStatus,
};
