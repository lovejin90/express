var express = require("express");
const router = express.Router();

const data = require("./data");
const createError = require("http-errors");
const { validationResult, check } = require("express-validator");
const mysql = require("../../mysql");

router.get("/getList", async function (req, res, next) {
  data.getMenuList((row) => {
    //유효성 검사에 적합하지 않으면 정보를 다시 조회 후, updateMemo 페이지를 다시 랜더링한다.
    res.send(row);
  });
});

router.post(
  "/insertMemo",
  [check("content").isLength({ min: 1, max: 500 })],
  (req, res) => {
    let errs = validationResult(req);

    let param = JSON.parse(JSON.stringify(req.body));
    let active_yn = param["active_yn"];
    let url = param["url"];
    let name = param["name"];

    data.insertMemu(name, active_yn, url, (rlt) => {
      res.send(rlt);
    });
  }
);
router.post(
  "/updateMemo",
  [check("content").isLength({ min: 1, max: 500 })],
  (req, res) => {
    let errs = validationResult(req);

    let param = JSON.parse(JSON.stringify(req.body));
    let id = param["id"];
    let active_yn = param["active_yn"];
    let url = param["url"];
    let name = param["name"];

    data.updateMemu(id, name, active_yn, url, (rlt) => {
      res.send(rlt);
    });
  }
);

router.post(
  "/deleteMemu",
  [check("content").isLength({ min: 1, max: 500 })],
  (req, res) => {
    let errs = validationResult(req);

    let param = JSON.parse(JSON.stringify(req.body));
    let id = param["id"];

    data.deleteMemu(id, (rlt) => {
      res.send(rlt);
    });
  }
);
router.post(
  "/updateStatus",
  [check("content").isLength({ min: 1, max: 500 })],
  (req, res) => {
    let errs = validationResult(req);

    let param = JSON.parse(JSON.stringify(req.body));
    let id = param["id"];
    let active_yn = param["active_yn"];

    data.updateStatus(id, active_yn, (rlt) => {
      res.send(rlt);
    });
  }
);
module.exports = router;
