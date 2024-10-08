var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cron = require("node-cron");

const agents = require("./routes/agents");

var app = express();

const test = require("./routes/test/index");
const menu = require("./routes/menu/index");
const lotto = require("./routes/lotto/index");
const gallery = require("./routes/gallery/index");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 2200);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/test", test);
app.use("/menu", menu);
app.use("/gallery", gallery);

// GET ALL
app.get("/agents", async function (req, res) {
  const allAgents = await agents.getAgents();
  res.send(allAgents);
});

lotto.getLottoNumber();
cron.schedule("0 0 22 * *", function () {
  lotto.getLottoNumber();
});

module.exports = app;

var server = app.listen(app.get("port"), function () {
  console.log("Express server listening on port " + server.address().port);
});
