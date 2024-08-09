var express = require('express');
const router = express.Router();

const {check, validationResult} = require("express-validator");
const mysql = require("../mysql");
const createError = require("http-errors");

router.get('/newMemo',  function(req, res, next){
    res.render('newmemo');
});

router.post('/store', [check('content').isByteLength({min:1, max:500})], function(req, res, next){
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

router.get('/updateMemo', (req, res) =>{
    let id = req.query.id;

    mysql.getMemoById(id, (row)=>{
        if(typeof id === 'undefinde' || row.length <= 0){
            res.status(404).json({error:'undefinde memo'});
        }else{
            res.render('updateMemo',{row:row[0]});
        }
    });
});

router.post('/updateMemo', [check('content').isLength({min:1, max:500})], (req, res) =>{
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

router.get('/deleteMemo', (req, res) =>{
    let id = req.query.id;
    mysql.deleteMemoById(id, () =>{
        res.redirect('/mysql');
    });
});

// catch 404 and forward to error handler
router.use(function(req, res, next) {
    next(createError(404));
});

// error handler
router.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = router;