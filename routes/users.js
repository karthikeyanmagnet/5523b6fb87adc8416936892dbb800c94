var express = require('express');
var router = express.Router();
var request = require('request');



//var apiUrl = "http://coin.hapy.mobi/";
//var userId = "58d7dbb4255f4d3c5262a6fb";
//var authorization = "Bearer cV62576T73ryVodC8qyalsIUyUAzzrjzh2YFaAAdHy5k9TdHRW";

require("./common.js");
//testfile();

//function start(req, res, next) {
//    
//    
//    if(typeof req.session.data=="undefined" ) {
//       
//        console.log(userId);
//        res.redirect("/");
//    }
//    
//     userId=req.session.data._id;
//     
//     
//    path = "/users" + req.path;
//    ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
//    agent = useragent.parse(req.headers['user-agent']);
//    os = agent.os.toString(); // 'Mac OSX 10.8.1' 
//    sess=req.session.data;
////    userId=sess._id;
//    meta = {
//        "user_ip": ip,
//        "user_os": os,
//        "location": {
//            "lat": "1",
//            "lon": "1",
//            "location_name": "cbe"
//        }
//    };
//
//    next();
//}




/* GET users listing. */
router.get('/',start, function (req, res, next) {
    

    var options = {
        url: apiUrl + 'get_common_count/' + userId,
        method: 'GET',
        headers: {
            'Authorization': authorization,
        },
        json: true
    };
    
    
     var options1 = {
        url: apiUrl + 'getAllShareRate',
        method: 'GET',
        headers: {
            'Authorization': authorization,
        },
        json: true
    };
    
    
    var options2 = {
        url: apiUrl + 'get_graph_common_count_users/'+userId,
        method: 'GET',
        headers: {
            'Authorization': authorization,
        },
        json: true
    };
    
    
    
    

    request(options, function (err, apiRes, body) {
          request(options1, function (err1, apiRes1, body1) {  
              request(options2, function (err2, apiRes2, body2) {  
        var jsonData = body.data;
        linegrap=body1;
        linegrap1=body2;
        jsonData.path=path;
        res.render('users/index', jsonData);
    });
    });
    });
    
    
    
    


});




router.get('/profile',start, function (req, res, next) {



    var options = {
        url: apiUrl + 'user/' + userId,
        method: 'GET',
        headers: {
            'Authorization': authorization,
        }
    };

    request(options, function (err, apiRes, body) {
        console.log(body, "body");
        var jsonData = JSON.parse(body).data;
        jsonData.path=path;
        res.render('users/profile', jsonData);
    });

});





router.get('/editProfile',start, function (req, res, next) {



    var ch=0;
     if(typeof req.query.ch!='undefined') {
     ch=req.query.ch;     
     }

    var options = {
        url: apiUrl + 'user/' + userId,
        method: 'GET',
        headers: {
            'Authorization': authorization,
        }
    };

    request(options, function (err, apiRes, body) {
        console.log(body, "body");
        var jsonData = JSON.parse(body).data;
        jsonData.ch=ch;
        jsonData.path=path;
        res.render('users/editProfile', jsonData);
    });

});



router.get('/cart',start, function (req, res, next) {



    

    var options = {
        url: apiUrl + 'user/' + userId,
        method: 'GET',
        headers: {
            'Authorization': authorization,
        }
    };

    request(options, function (err, apiRes, body) {
        console.log(body, "body");
        var jsonData = JSON.parse(body).data;
        jsonData.path=path;
        res.render('users/cart', jsonData);
    });

});


router.get('/network',start, function (req, res, next) {
        
        res.render('users/network');
    

});
router.get('/escrow',start, function (req, res, next) {
        
        res.render('users/escrow');
    

});

router.get('/bouns',start, function (req, res, next) {
        
        res.render('users/bouns');
    

});

router.get('/cryptovalue',start, function (req, res, next) {
    
    
     var options = {
        url: "http://apilayer.net/api/live?access_key=700877487c097bcd4f34d1d253e8051c",
        method: 'GET',
        json: true
    };
    
      request(options, function (err, apiRes, body) {
       var jsonData={};
        jsonData.currencylayer=body; 
          res.render('users/cryptovalue', jsonData, function (err, doc) {
            console.log(err, "err");
            res.send(doc);

        });
    });
    

});
router.get('/tutorials',start, function (req, res, next) {
        
        res.render('users/tutorials');
    

});


router.get('/shop/paymentsuccess',start, function (req, res, next) {
       
        res.render('users/shop/paymentsuccess');
    

});


router.get('/changepass',start, function (req, res, next) {
       
        res.render('users/changePass');
    

});



router.post('/editProfile', start, function (req, res, next) {



var image_url1="";
var image_url2="";

if(typeof req.files.kyc1!="undefined") {
var sampleFile = req.files.kyc1;
var fileName=sampleFile.name;
fileName=fileName.split('.');
image_url1='/images/kyc/kyc1_'+userId+'.'+fileName[1];
sampleFile.mv(filepath+'/public/images/kyc/kyc1_'+userId+'.'+fileName[1], function(err) {
    if (err)
      return res.status(500).send(err);
 
    
  });
  }
  
  if(typeof req.files.kyc2!="undefined") {
var sampleFile = req.files.kyc2;
var fileName=sampleFile.name;
fileName=fileName.split('.');
image_url2='/images/kyc/kyc2_'+userId+'.'+fileName[1];
sampleFile.mv(filepath+'/public/images/kyc/kyc2_'+userId+'.'+fileName[1], function(err) {
    if (err)
      return res.status(500).send(err);
 
    
  });
  }


    var jsonData = {
        "_id": req.body.id,
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "mobilenumber": req.body.mobilenumber,
        "idproof_expirydate": req.body.idproof_expirydate,
        "idproof_number": req.body.idproof_number,
        "bank_ifsccode": req.body.bank_ifsccode,
        "bankaccount_holdername": req.body.bankaccount_holdername,
        "bankaccount_number": req.body.bankaccount_number,
        "pincode": req.body.pincode,
        "city": req.body.city,
        "country": req.body.country,
        "image_url1":image_url1,
        "image_url2":image_url2,
        "last_name": req.body.last_name,
        "first_name": req.body.first_name,
        "type": 1,
        "meta": meta
    }
    
   

    var jsonData = JSON.stringify(jsonData);
     console.log(jsonData);
    var options = {
        url: apiUrl + 'userUpdate',
        method: 'PUT',
        headers: {
            'Authorization': authorization,
        },
        form: {jsonData: jsonData}
    };

    request(options, function (err, apiRes, body) {
        console.log(body, "body1");

        res.redirect('/users/editProfile?ch=1');
    });

});



router.post('/changepass', start, function (req, res, next) {
console.log(req.body,"req.body");

    var jsonData = {"user_id":userId,"loginpwd":req.body.login_pass,"transactionpwd":req.body.new_tran_pass};
var jsonData={   "_id": userId,   "current_password": req.body.login_pass,   "new_password": req.body.new_pass,   "retype_password": req.body.new_pass,   "type": "1" };

    console.log(jsonData);

    var jsonData = JSON.stringify(jsonData);
    var options = {
        url: apiUrl + 'changePassword',
        method: 'POST',
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
