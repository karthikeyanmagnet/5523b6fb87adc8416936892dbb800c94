//var express = require('express');
//var router = express.Router();
//var request = require('request');



//var apiUrl = "http://coin.hapy.mobi/";
//var userId = "58d7dbb4255f4d3c5262a6fb";
//var authorization = "Bearer cV62576T73ryVodC8qyalsIUyUAzzrjzh2YFaAAdHy5k9TdHRW";




require(".././common.js");




router.get('/tranhistory', start, function (req, res, next) {


    var jsonDataP = {};
    jsonDataP.authorization = authorization;
    jsonDataP.meta = meta;
    jsonDataP.userId = userId;
    jsonDataP.path = path;

    var jsonData = {"transaction_type": 1, "transaction_status": 4
        , "user_id":userId, "start": "0", "limit": "10", "start_date": "0", "end_date":"0"};




    var jsonData = JSON.stringify(jsonData);
    var options = {
        url: apiUrl + 'transactionByUserId',
        method: 'POST',
        headers: {
            'Authorization': authorization,
            'Content-Type': 'application/x-www-form-urlencoded'

        },
        form: {jsonData: jsonData},
        json: true,
    };

    request(options, function (err, apiRes, body) {
        console.log(body.data.message, "body");

      

        jsonDataP.data=body.data;
        res.render('users/tranhistory/index', jsonDataP, function (err, doc) {
            console.log(err, "err");
            res.send(doc);

        });


    });






});



router.get('/sellhistory', start, function (req, res, next) {


    var jsonDataP = {};
    jsonDataP.authorization = authorization;
    jsonDataP.meta = meta;
    jsonDataP.userId = userId;
    jsonDataP.path = path;

    var jsonData = {"transaction_type": 2, "transaction_status": 4
        , "user_id":userId, "start": "0", "limit": "10", "start_date": "0", "end_date":"0"};




    var jsonData = JSON.stringify(jsonData);
    var options = {
        url: apiUrl + 'transactionByUserId',
        method: 'POST',
        headers: {
            'Authorization': authorization,
            'Content-Type': 'application/x-www-form-urlencoded'

        },
        form: {jsonData: jsonData},
        json: true,
    };

    request(options, function (err, apiRes, body) {
        console.log(body.data.message, "body");

      

        jsonDataP.data=body.data;
        res.render('users/tranhistory/sellhis', jsonDataP, function (err, doc) {
            console.log(err, "err");
            res.send(doc);

        });


    });






});



router.post('/tranhistory/filter', start, function (req, res, next) {

    var jsonData = {"transaction_type":req.body.transaction_type, "transaction_status": req.body.transaction_status
        , "user_id": userId, "start": req.body.start, "limit": req.body.limit, "start_date": req.body.start_date, "end_date": req.body.end_date};




    var jsonData = JSON.stringify(jsonData);
    var options = {
        url: apiUrl + 'transactionByUserId',
        method: 'POST',
        headers: {
            'Authorization': authorization,
            'Content-Type': 'application/x-www-form-urlencoded'

        },
        form: {jsonData: jsonData},
        json: true,
    };

    request(options, function (err, apiRes, body) {
        console.log(body.data.message, "body");
        jsonDataP={};
        jsonDataP.data=body.data;
        res.render('users/myaccount/page', jsonDataP, function (err, doc) {
            console.log(err, "err");
            res.send(doc);

        });








    });

});



module.exports = router;
