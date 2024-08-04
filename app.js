var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/users');
var usersRouter = require('./routes/users');
const agents = require('./routes/agents');
const mysql = require('./routes/mysql');
const {check, validationResult} = require('express-validator');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 2200);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// GET ALL
app.get("/agents", async function(req, res) {
  const allAgents = await agents.getAgents();
  res.send(allAgents);
});

app.get('/mysql', function(req, res, next) {
  const data = {
    title : '테스트페이지'
  };
  mysql.select((rows) =>{
    res.render('index', { data : data , rows: rows });
  });
});

app.get('/newMemo',  function(req, res, next){
  res.render('newmemo');
});

app.post('/store', [check('content').isByteLength({min:1, max:500})], function(req, res, next){
  let errs = validationResult(req);
  if(errs['errors'].length > 0){ //화면에 에러 출력하기 위함
    res.render('newmemo',{errs:errs['errors']});
  }else{
    let param = JSON.parse(JSON.stringify(req.body));
    mysql.insert(param['content'],() =>{
      res.redirect('/mysql');
    });
  }
});

app.get('/updateMemo', (req, res) =>{
  let id = req.query.id;

  mysql.getMemoById(id, (row)=>{
    if(typeof id === 'undefinde' || row.length <= 0){
      res.status(404).json({error:'undefinde memo'});
    }else{
      res.render('updateMemo',{row:row[0]});
    }
  });
});

app.post('/updateMemo', [check('content').isLength({min:1, max:500})], (req, res) =>{
  let errs = validationResult(req);

  let param = JSON.parse(JSON.stringify(req.body));
  let id = param['id'];
  let content = param['content'];

  if(errs['errors'].length > 0){ //화면에 에러 출력하기 위함

    mysql.getMemoById(id, (row)=>{ //유효성 검사에 적합하지 않으면 정보를 다시 조회 후, updateMemo 페이지를 다시 랜더링한다.
      res.render('updateMemo',{row:row[0], errs:errs['errors']});
    });
  }else{
    mysql.updateMemoById(id, content, () =>{
      res.redirect('/mysql');
    });
  }
});

app.get('/deleteMemo', (req, res) =>{
  let id = req.query.id;
  mysql.deleteMemoById(id, () =>{
    res.redirect('/mysql');
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


////////////////////////////////////////////////////////////
module.exports = app;

var server = app.listen(app.get('port'), function() {

console.log('Express server listening on port ' + server.address().port);

});
