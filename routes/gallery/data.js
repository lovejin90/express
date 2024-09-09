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
const getList = async (table, page, limit, callback) => {
  const conn = connect();
  const sql =
    "SELECT * FROM ${table} where use_yn='Y' ORDER BY 'order' DESC limit ${page},${limit}";
  const list = [];
  let data = conn.query(sql, (error, rows, fields) => {
    if (error) return error;
    callback(rows);
  });
};

function insertCategory(data, callback) {
  const conn = connect();
  conn.query(
    `INSERT INTO category (title, regdate, order, use_yn, bg_img) VALUES ('${data.title}','NOW()','${data.order}','${data.use_yn}','${data.bg_img}' )`,
    (err, result) => {
      if (err) throw err;
      callback();
    }
  );
}

function updateCategory(data, id, callback) {
  const conn = connect();
  conn.query(
    `UPDATE category SET title='${data.title}', order='${data.order}' , use_yn='${data.use_yn}' , bg_img= '${data.bg_img}'  WHERE idx=${id}`,
    (err, result) => {
      if (err) throw err;
      callback();
    }
  );
}

function deleteCategory(id, callback) {
  const conn = connect();
  conn.query(`DELETE FROM category WHERE idx=${id}`, (err, result) => {
    if (err) throw err;
    callback();
  });
}

function updateCategoryStatus(id, active_yn, callback) {
  const conn = connect();
  conn.query(
    `UPDATE category SET active_yn='${active_yn}' WHERE idx=${id}`,
    (err, result) => {
      if (err) throw err;
      callback();
    }
  );
}

function insertBoard(data, callback) {
  const conn = connect();
  conn.query(
    `INSERT INTO photo_board (category_idx, title, contents, url, regdate, order, use_yn) VALUES ('${data.category_idx}','${data.title}','${data.contents}','${data.url}','NOW()','${data.order}','${data.use_yn}' )`,
    (err, result) => {
      if (err) throw err;
      callback();
    }
  );
}

function updateBoard(data, id, callback) {
  const conn = connect();
  conn.query(
    `UPDATE photo_board SET category_idx='${data.category_idx}', title='${data.title}', contents='${data.contents}', url='${data.url}', order='${data.order}' , use_yn='${data.use_yn}' WHERE idx=${id}`,
    (err, result) => {
      if (err) throw err;
      callback();
    }
  );
}

function deleteBoard(id, callback) {
  const conn = connect();
  conn.query(`DELETE FROM photo_board WHERE idx=${id}`, (err, result) => {
    if (err) throw err;
    callback();
  });
}

function updateBoardStatus(id, use_yn, callback) {
  const conn = connect();
  conn.query(
    `UPDATE photo_board SET use_yn='${use_yn}' WHERE idx=${id}`,
    (err, result) => {
      if (err) throw err;
      callback();
    }
  );
}

module.exports = {
  getList,
  insertCategory,
  updateCategory,
  deleteCategory,
  updateCategoryStatus,
  insertBoard,
  updateBoard,
  deleteBoard,
  updateBoardStatus,
};
