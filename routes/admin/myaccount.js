//var express = require('express');
//var router = express.Router();
//var request = require('request');



//var apiUrl = "http://coin.hapy.mobi/";
//var userId = "58d7dbb4255f4d3c5262a6fb";
//var authorization = "Bearer cV62576T73ryVodC8qyalsIUyUAzzrjzh2YFaAAdHy5k9TdHRW";



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




///* GET users listing. */
//router.get('/myaccount', start, function (req, res, next) {
//
//
//
// res.render("users/myaccount/index","",function (err,doc){
//         
//         console.log(err);
//         res.send(doc);
//     });
//
//
//
//
//});



router.get('/coinsafe', start, function (req, res, next) {



 res.render("users/myaccount/coinsafe","",function (err,doc){
         
         console.log(err);
         res.send(doc);
     });
     
     });



router.get('/myaccount', start, function (req, res, next) {


    var jsonDataP = {};
    jsonDataP.authorization = authorization;
    jsonDataP.meta = meta;
    jsonDataP.userId = userId;
    jsonDataP.path = path;

    var jsonData = {"transaction_type": 0, "transaction_status": 2
        , "user_id": userId, "start": "0", "limit": "10", "start_date": "0", "end_date":"0"};




    var jsonData = JSON.stringify(jsonData);
    console.log(jsonData);
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
        console.log(body.data, "body");

      

        jsonDataP.data=body.data;
        res.render('users/myaccount/index', jsonDataP, function (err, doc) {
            console.log(err, "err");
            res.send(doc);

        });


    });






});


router.get('/myaccount/receviedcoins', start, function (req, res, next) {


    var jsonDataP = {};
    jsonDataP.authorization = authorization;
    jsonDataP.meta = meta;
    jsonDataP.userId = userId;
    jsonDataP.path = path;

    var jsonData = {"transaction_type": 1, "transaction_status": 2
        , "user_id": "0" , "to_user_id": userId, "start": "0", "limit": "100", "start_date": "0", "end_date":"0"};




    var jsonData = JSON.stringify(jsonData);
    console.log(jsonData);
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
        console.log(body.data, "body");

      

        jsonDataP.data=body.data;
        res.render('users/myaccount/receviedcoins', jsonDataP, function (err, doc) {
            console.log(err, "err");
            res.send(doc);

        });


    });






});


router.post('/myaccount/filter', start, function (req, res, next) {

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
console.log(jsonData);
    request(options, function (err, apiRes, body) {
        console.log(body.data, "body");
        jsonDataP={};
        jsonDataP.data=body.data;
        res.render('users/myaccount/page', jsonDataP, function (err, doc) {
            console.log(err, "err");
            res.send(doc);

        });








    });

});



router.post('/myaccount/filterReceviedCoins', start, function (req, res, next) {

    var jsonData = {"transaction_type":req.body.transaction_type, "transaction_status": req.body.transaction_status
        , "user_id": "0","to_user_id": userId, "start": req.body.start, "limit": req.body.limit, "start_date": req.body.start_date, "end_date": req.body.end_date};




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
console.log(jsonData);
    request(options, function (err, apiRes, body) {
        console.log(body, "body");
        jsonDataP={};
        jsonDataP.data=body.data;
        res.render('users/myaccount/pageReceviedCoins', jsonDataP, function (err, doc) {
            console.log(err, "err");
            res.send(doc);

        });








    });

});

router.post('/sell', start, function (req, res, next) {


    var jsonData = {
        "user_id": "58d7dbb4255f4d3c5262a6fb",
        "to_user_id": "58d7dbb4255f4d3c5262a6fb",
        "user_type": "1",
        "no_of_cointransferred": "0.0",
        "transaction_type": "1",
        "transaction_status": "1",
        "meta": meta
    };


    console.log(jsonData);

    var jsonData = JSON.stringify(jsonData);
    var options = {
        url: apiUrl + 'peertopeertransaction',
        method: 'POST',
        headers: {
            'Authorization': authorization,
            'Content-Type': 'application/x-www-form-urlencoded'

        },
        form: {jsonData: jsonData},
        json: true,
    };

    request(options, function (err, apiRes, body) {
console.log(body.data.message,"body");

    res.json(body);
 
    });

});



router.post('/coinsafe', start, function (req, res, next) {
console.log(req.body,"req.body");

    var jsonData = {"user_id":userId,"loginpwd":req.body.login_pass,"transactionpwd":req.body.new_tran_pass};


    console.log(jsonData);

    var jsonData = JSON.stringify(jsonData);
    var options = {
        url: apiUrl + 'savetransactionpwd',
        method: 'PUT',
        headers: {
            'Authorization': authorization,
            'Content-Type': 'application/x-www-form-urlencoded'

        },
        form: {jsonData: jsonData},
        json: true,
    };

    request(options, function (err, apiRes, body) {
console.log(body,"body");

    res.json(body);
 
    });

});


module.exports = router;
