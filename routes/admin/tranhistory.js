//var express = require('express');
//var router = express.Router();
//var request = require('request');



//var apiUrl = "http://coin.hapy.mobi/";
 userId = "58d7dbb4255f4d3c5262a6fb";
 authorization = "Bearer 8ljkCFUd0wRQTjQYlF6BKKce7OUnakwCyBF5XUgf11fqkfXUZZ";




//require(".././common.js");

function start(req, res, next) {
    path = "/admin" + req.path;
    ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    agent = useragent.parse(req.headers['user-agent']);
    os=agent.os.toString(); // 'Mac OSX 10.8.1' 
    meta={
            "user_ip": ip,
            "user_os": os,
            "location": {
                "lat": "1",
                "lon": "1",
                "location_name": "cbe"
            }
        };

    next();
}



router.get('/tranhistorya', start,function (req, res, next) {





    var jsonDataP = {};
    jsonDataP.authorization = authorization;
    jsonDataP.meta = meta;
    jsonDataP.userId = userId;
    jsonDataP.path = "";

    var jsonData = {"transaction_type": 1, "transaction_status": 4
        , "user_id":userId, "start": "0", "limit": "10", "start_date": "0", "end_date":"0"};


console.log("call",jsonData);
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
console.log("call");
    request(options, function (err, apiRes, body) {
        console.log(body, "body");

      

        jsonDataP.data=body.data;
        res.render('admin/tranhistory/index', jsonDataP, function (err, doc) {
            console.log(err, "err");
            res.send(doc);

        });


    });






});



router.get('/sellhistorya', start, function (req, res, next) {

console.log('call');
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
        res.render('admin/tranhistory/sellhis', jsonDataP, function (err, doc) {
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
