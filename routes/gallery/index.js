var express = require("express");
const router = express.Router();

const data = require("./data");
const createError = require("http-errors");
const { validationResult, check } = require("express-validator");
const mysql = require("../mysql");

router.post("/getList", async function (req, res, next) {
  let param = JSON.parse(JSON.stringify(req.body));
  if (param["table"] && param["page"] && param["limit"]) {
    let item = {
      table: param["table"],
      page: param["page"],
      limit: param["limit"],
    };
    data.getList(item, (row) => {
      res.send(row);
    });
  } else {
    res.send({ err: "잘못된 데이터입니다." });
  }
});

router.post("/insCategory", (req, res) => {
  let errs = validationResult(req);

  let param = JSON.parse(JSON.stringify(req.body));
  let item = {
    title: param["title"],
    order: param["order"],
    use_yn: param["use_yn"],
    bg_img: param["bg_img"],
  };
  data.insertCategory(item, (rlt) => {
    res.send(rlt);
  });
});

router.post("/uptCategory", (req, res) => {
  let errs = validationResult(req);

  let param = JSON.parse(JSON.stringify(req.body));
  let id = param["id"];
  let item = {
    title: param["title"],
    order: param["order"],
    use_yn: param["use_yn"],
    bg_img: param["bg_img"],
  };

  data.updateCategory(item, id, (rlt) => {
    res.send(rlt);
  });
});

router.post(
  "/delCategory",
  [check("content").isLength({ min: 1, max: 500 })],
  (req, res) => {
    let errs = validationResult(req);

    let param = JSON.parse(JSON.stringify(req.body));
    let id = param["id"];

    data.deleteCategory(id, (rlt) => {
      res.send(rlt);
    });
  }
);
router.post(
  "/uptCategoryStatus",
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

router.post("/insBoard", (req, res) => {
  let errs = validationResult(req);

  let param = JSON.parse(JSON.stringify(req.body));
  let item = {
    category_idx: param["category_idx"],
    title: param["title"],
    contents: param["contents"],
    url: param["url"],
    order: param["order"],
    use_yn: param["use_yn"],
  };

  data.insertBoard(item, (rlt) => {
    res.send(rlt);
  });
});

router.post("/uptBoard", (req, res) => {
  let errs = validationResult(req);

  let param = JSON.parse(JSON.stringify(req.body));
  let id = param["id"];
  let item = {
    category_idx: param["category_idx"],
    title: param["title"],
    contents: param["contents"],
    url: param["url"],
    order: param["order"],
    use_yn: param["use_yn"],
  };

  data.updateBoard(item, id, (rlt) => {
    res.send(rlt);
  });
});

router.post(
  "/delBoard",
  [check("content").isLength({ min: 1, max: 500 })],
  (req, res) => {
    let errs = validationResult(req);

    let param = JSON.parse(JSON.stringify(req.body));
    let id = param["id"];

    data.deleteBoard(id, (rlt) => {
      res.send(rlt);
    });
  }
);
router.post(
  "/uptBoardStatus",
  [check("content").isLength({ min: 1, max: 500 })],
  (req, res) => {
    let errs = validationResult(req);

    let param = JSON.parse(JSON.stringify(req.body));
    let id = param["id"];
    let active_yn = param["active_yn"];

    data.updateBoardStatus(id, active_yn, (rlt) => {
      res.send(rlt);
    });
  }
);

module.exports = router;
