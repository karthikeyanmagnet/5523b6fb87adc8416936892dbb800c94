//var express = require('express');
//var router = express.Router();
//var request = require('request');



//var apiUrl = "http://coin.hapy.mobi/";
//var userId = "58d7dbb4255f4d3c5262a6fb";
//var authorization = "Bearer cV62576T73ryVodC8qyalsIUyUAzzrjzh2YFaAAdHy5k9TdHRW";



require(".././common.js");


/* GET users listing. */
router.get('/information', start, function (req, res, next) {



    var jsonData = JSON.stringify(jsonData);
    var options = {
        url: apiUrl + 'supportinfo',
        method: 'GET',
        headers: {
            'Authorization': authorization,
            'Content-Type': 'application/x-www-form-urlencoded'

        },
        json: true,
    };

    request(options, function (err, apiRes, body) {
    var jsonData=body.data;
    jsonData.path=path;
     res.render("users/information/index",jsonData,function (err,doc){
         
         console.log(err);
         res.send(doc);
     });






    });


});


router.get('/informationView/:id', start, function (req, res, next) {


    
    var jsonData = JSON.stringify(jsonData);
    var options = {
        url: apiUrl + 'supportinfo/'+req.params.id,
        method: 'GET',
        headers: {
            'Authorization': authorization,
            'Content-Type': 'application/x-www-form-urlencoded'

        },
        json: true,
    };

    request(options, function (err, apiRes, body) {
    var jsonData=body.data;
    jsonData.path=path;
     res.render("users/information/view",jsonData,function (err,doc){
         
         console.log(err);
         res.send(doc);
     });






    });


});




module.exports = router;
