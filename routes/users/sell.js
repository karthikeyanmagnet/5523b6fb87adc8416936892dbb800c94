//var express = require('express');
//var router = express.Router();
//var request = require('request');



//var apiUrl = "http://coin.hapy.mobi/";
//var userId = "58d7dbb4255f4d3c5262a6fb";
//var authorization = "Bearer cV62576T73ryVodC8qyalsIUyUAzzrjzh2YFaAAdHy5k9TdHRW";



require(".././common.js");




/* GET users listing. */
router.get('/sell', start, function(req, res, next) {



    var jsonData = {};
    jsonData.authorization = authorization;
    jsonData.meta = meta;
    jsonData.userId = userId;
    jsonData.path = path;



    var options = {
        url: apiUrl + 'get_coin_baserate',
        method: 'GET',
        headers: {
            'Authorization': authorization,
            'Content-Type': 'application/x-www-form-urlencoded'

        },
        json: true,
    };

    request(options, function(err, apiRes, body) {
        console.log(body, "body");
        jsonData.data = body.data.data;
        
        
         var options = {
        url: apiUrl + 'get_common_count/'+userId,
        method: 'GET',
        headers: {
            'Authorization': authorization,
            'Content-Type': 'application/x-www-form-urlencoded'

        },
        json: true,
    };
        
        request(options, function(err1, apiRes1, body1) {
            
         jsonData.balanceCoin=body1.data.data.total_coins_buyed;   
        res.render('users/sell/index', jsonData, function(err, doc) {
            console.log(err, "err");
            res.send(doc);

        });
        });
    });


});



router.post('/sell', start, function(req, res, next) {


    var jsonData = {
        "user_id": req.body.user_id,
        "to_user_id": req.body.to_user_id,
        "user_type": "1",
        "no_of_cointransferred": req.body.no_of_cointransferred,
        "transaction_type": "0",
        "transaction_status": "1",
        "meta": meta,
        "transaction_password": req.body.tran_pass,
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

    request(options, function(err, apiRes, body) {
        console.log(body.data.message, "body");

        res.json(body);
        //   res.redirect('/users/sell')






    });

});


router.get('/toUser', start, function(req, res, next) {




    console.log(req.query.term);


    var options = {
        url: apiUrl + 'userfindByEmailid/' + req.query.term,
        method: 'GET',
        headers: {
            'Authorization': authorization,
            'Content-Type': 'application/x-www-form-urlencoded'

        },
        json: true,
    };

    request(options, function(err, apiRes, body) {
        console.log(body.data.data, "body");

        var jsonArr = [];

        for (var i in body.data.data) {
            var jsonObj = {};

            jsonObj.id = body.data.data[i]._id;
            jsonObj.label = body.data.data[i].email;
            jsonObj.value = body.data.data[i].email;
            jsonArr.push(jsonObj);
        }





        jsonArr.push(jsonObj);

        res.json(jsonArr);
        //   res.redirect('/users/sell')






    });

});

module.exports = router;
