var express = require('express');
var router = express.Router();

function start(req, res, next) {




    path = "/admin" + req.path;
    ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    agent = useragent.parse(req.headers['user-agent']);
    os = agent.os.toString(); // 'Mac OSX 10.8.1' 
    sess = req.session.data;
    meta = {
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


/* GET home page. */
router.get('/', function (req, res, next) {



    var options = {
        url: "http://apilayer.net/api/live?access_key=700877487c097bcd4f34d1d253e8051c",
        method: 'GET',
        json: true
    };
    
     var jsonData = JSON.stringify({ "product_type": 4, "start": 0, "limit": 10 });
    var options1 = {
        url: apiUrl + 'getAllProducts_without_auth',
        method: 'POST',
         form: { jsonData: jsonData },
         json:true
        
        
    };

    request(options, function (err, apiRes, body) {
    
        
       request(options1, function (err1, apiRes1, body1) { 
        
        console.log(body1,"body");
        var jsonData={};
        jsonData.currencylayer=body;
       jsonData.productdetails=body1.data.data.productdetails;
        console.log(body1,"body1");
        res.render('index', jsonData, function (err, doc) {
            console.log(err, "err");
            res.send(doc);

        });
        
        });
    });




});

router.get('/contact', function (req, res, next) {
    res.render('contact', {title: 'Express'});
});

router.get('/faq', function (req, res, next) {
    res.render('faq', {title: 'Express'});
});

router.get('/about', function (req, res, next) {
    res.render('about', {title: 'Express'});
});

router.get('/exchange', function (req, res, next) {
    res.render('exchange', {title: 'Express'});
});


router.get('/coc', function (req, res, next) {
    res.render('coc', {title: 'Express'});
});

router.get('/comingsoon', function (req, res, next) {
    res.render('comingsoon', {title: 'Express'});
});

router.get('/membership', function (req, res, next) {
    res.render('membership', {title: 'Express'});
});

router.get('/blog', function (req, res, next) {
    res.render('blog', {title: 'Express'});
});

router.get('/opportunity', function (req, res, next) {
    res.render('opportunity', {title: 'Express'});
});




router.get('/login', function (req, res, next) {
    var sess = req.session;
    sess.data = {};
    var jsonData = {};
    jsonData.authorization = authorization;
    res.render('login', jsonData);
});

router.post('/login', function (req, res, next) {
    console.log("======================");
    var sess = req.session;

    var jsonData = {"email": req.body.email, "password": req.body.password, "type": 1};


    console.log(jsonData);

    var jsonData = JSON.stringify(jsonData);
    var options = {
        url: apiUrl + 'userLogin',
        method: 'POST',
        headers: {
            'Authorization': authorization,
            'Content-Type': 'application/x-www-form-urlencoded'

        },
        form: {jsonData: jsonData},
        json: true,
    };

    request(options, function (err, apiRes, body) {

        sess.data = {};
        sess.data = body.data.data;
//         sess.views=body.data;
        console.log(body, "body");

        res.json(body);







    });

});




router.post('/register', function (req, res, next) {
    console.log("======================");
    var sess = req.session;

    var jsonData = {
        "first_name": req.body.first_name,
        "last_name": req.body.first_name,
        "email": req.body.email,
        "password": req.body.password,
        "loginpassword": req.body.loginpassword,
        "country": req.body.country,
        "city": req.body.city,
        "pincode": parseInt(req.body.pincode),
        "mobilenumber": req.body.mobilenumber,
        "type": 1,
        "meta": meta
    };


    console.log(jsonData);

    var jsonData = JSON.stringify(jsonData);
    var options = {
        url: apiUrl + 'userRegistration',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'

        },
        form: {jsonData: jsonData},
        json: true,
    };
    
     
    request(options, function (err, apiRes, body) {
        
            
        sess.data = {};
        sess.data = body.data.data;
//         sess.views=body.data;
        console.log(body, "body");

        res.json(body);


  




    });

});


router.get('/logout', function (req, res, next) {

    req.session.destroy();
    res.redirect('/');
});


router.get('/register', start, function (req, res, next) {


var options = {
        url: apiUrl + 'getAllcountrylist',
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization':'Bearer KmSt5PTxnZ7AP5YF3dCJJxYAvuxZd0K0XMztY28EIBsHgtiVNP'
        },
        
        json: true,
    };

   request(options, function (err, apiRes, body) {
       getAllcountrylist= body;
       
       res.render('register');
        
         });   

});




//router.get('/register', start, function (req, res, next) {
//
//
//
//    var options = {
//        url: apiUrl + 'user/' + userId,
//        method: 'GET',
//        headers: {
//            'Authorization': authorization,
//        }
//    };
//
//    request(options, function (err, apiRes, body) {
//        console.log(body, "body");
//        var jsonData = JSON.parse(body).data;
//        res.render('register', jsonData);
//    });
//
//});


module.exports = router;
