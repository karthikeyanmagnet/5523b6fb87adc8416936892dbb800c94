function start(req, res, next) {
    path = "/admin" + req.path;
    ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    agent = useragent.parse(req.headers['user-agent']);
    os = agent.os.toString(); // 'Mac OSX 10.8.1' 
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


router.get('/', start, function (req, res, next) {
    res.render('admin/login', "", function (err, doc) {
        res.send(doc);
        console.log(err, "--err--");
    });
});

router.post('/adminlogin', function (req, res, next) {
    
    var jsonData = {
        "email": req.body.email,
        "password": req.body.password
    } 
    var jsonData = JSON.stringify(jsonData);  
    var options = {
        url: apiUrl + 'adminLogin',
        method: 'POST',
        headers: {
            'Authorization': authorization,
        },
        form: {jsonData: jsonData},
        json: true
    };
 
    request(options,function(err, apiRes, body){

       res.json(body.data);
    });
});

router.get('/dashboard', start, function (req, res, next) {

    var options = {
        url: apiUrl + 'get_common_count/',
        method: 'GET',
        headers: {
            'Authorization': authorization,
        }
    };

    request(options, function (err, apiRes, body) {
        var jsonData = JSON.parse(body).data;
        res.render('admin/index', jsonData, function (err, doc) {
            res.send(doc);
        });
    });
});



router.get('/users', start, function (req, res, next) {

    var options = {
        url: apiUrl + 'user/0/100',
        method: 'GET',
        headers: {
            'Authorization': authorization,
        }
    };

    request(options, function (err, apiRes, body) {
        console.log(body, "body----------------------");
        var jsonData = JSON.parse(body).data;
        res.render('admin/users', jsonData);
    });

});



router.get('/users/:id', start, function (req, res, next) {


    var options = {
        url: apiUrl + 'user/' + req.params.id,
        method: 'GET',
        headers: {
            'Authorization': authorization,
        }
    };

    request(options, function (err, apiRes, body) {
        console.log(body, "body----------------------");
        var jsonData = JSON.parse(body).data;
        res.render('admin/userView', jsonData, function (err, doc) {
            res.send(doc);
            console.log(err, "--err--");


        });
    });

});
//
//router.get('/products', start, function (req, res, next) {
//
//
//
//
//
//    var options = {
//        url: apiUrl + 'product/0/3',
//        method: 'GET',
//        headers: {
//            'Authorization': authorization,
//        }
//    };
//
//    request(options, function (err, apiRes, body) {
//        console.log(body, "body----------------------");
//        var jsonData = JSON.parse(body).data;
//        jsonData.pathname = path;
//        res.render('admin/products', jsonData, function (err, doc) {
//            res.send(doc);
//            console.log(err, "--err--");
//
//
//        });
//    });
//
//});
//
//router.get('/products/:id', start, function (req, res, next) {
//
//
//
//    var options = {
//        url: apiUrl + 'product/' + req.params.id,
//        method: 'GET',
//        headers: {
//            'Authorization': authorization,
//        }
//    };
//
//    request(options, function (err, apiRes, body) {
//
//        var jsonData = JSON.parse(body).data;
//        jsonData.ch = 0;
//        res.render('admin/productsUpdate', jsonData, function (err, doc) {
//            res.send(doc);
//            console.log(err, "--err--");
//
//
//        });
//    });
//
//});
//
//
//router.post('/productsUpdate/', start, function (req, res, next) {
//
//
//
//
//   
//    var product_id = req.body.product_id;
//    var jsonData = JSON.stringify(req.body);
//    var options = {
//        url: apiUrl + 'product',
//        method: 'PUT',
//        headers: {
//            'Authorization': authorization,
//            'Content-Type': 'application/x-www-form-urlencoded'
//
//        },
//        form: {jsonData: jsonData},
//        json: true,
//    };
//
//    request(options, function (err, apiRes, body) {
//
//        var options = {
//            url: apiUrl + 'product/' + product_id,
//            method: 'GET',
//            headers: {
//                'Authorization': authorization,
//            }
//        };
//
//        request(options, function (err, apiRes, body) {
//            console.log(body, "body");
//            var jsonData = JSON.parse(body).data;
//            jsonData.ch = 1;
//            res.render('admin/productsUpdate', jsonData, function (err, doc) {
//                res.send(doc);
//                console.log(err, "--err--");
//
//
//            });
//        });
//
//
//
//
//
//
//    });
//
//});
//
//
//
//router.get('/productCreate', start, function (req, res, next) {
//
//
//    var jsonData = {};
//    jsonData.data = {"product_id": "", "product_title": "", "product_subtitle": "", "product_description": "",
//        "product_subdescription": "", "product_price": "", "product_discount": "", "product_type": "", "product_status": ""}
//
//
//
//    res.render('admin/productCreate', jsonData, function (err, doc) {
//        res.send(doc);
//        console.log(err, "--err--");
//
//
//    });
//
//
//});
//
//
//
//router.post('/products/', function (req, res, next) {
//
//
//
//// var meta= {
////    "user_ip": "192.168.1.124",
////    "user_os": "Windows",
////    "location": {
////      "lat": "76.456N",
////      "lon": "72.345E",
////      "location_name": "Coimbatore"
////    }};
//
//    console.log(req.body, "req.body");
//    var product_id = req.body.product_id;
//    var jsonData = JSON.stringify(req.body);
//    var options = {
//        url: apiUrl + 'product',
//        method: 'POST',
//        headers: {
//            'Authorization': authorization,
//            'Content-Type': 'application/x-www-form-urlencoded'
//
//        },
//        form: {jsonData: jsonData},
//        json: true,
//    };
//
//    request(options, function (err, apiRes, body) {
//
//        res.redirect('/admin/products')
//
//
//
//
//
//    });
//
//});



router.get('/coinUpdate', start, function (req, res, next) {

    var ch = 0;
    if (typeof req.query.ch != 'undefined') {
        ch = req.query.ch;
    }



    var options = {
        url: apiUrl + 'get_coin_baserate',
        method: 'GET',
        headers: {
            'Authorization': authorization,
            'Content-Type': 'application/x-www-form-urlencoded'

        },
        json: true,
    };

    request(options, function (err, apiRes, body) {
        console.log(body, "call");
        var jsonData = body.data;
        jsonData.ch = ch;
        res.render('admin/coinUpdate', jsonData, function (err, doc) {
            res.send(doc);
            console.log(err, "--err--");


        });





    });




});


router.post('/coinUpdate', start, function (req, res, next) {

    console.log(req.body);


    var jsonData = {
        "per_dollar_no_ofcoins": parseInt(req.body.per_dollar_no_ofcoins).toFixed(2),
//        "coin_current_base_price": parseInt(req.body.coin_current_base_price),
        "per_coin_buy_dollar": parseInt(req.body.per_coin_buy_dollar).toFixed(2),
        "per_coin_sell_dollar": parseInt(req.body.per_coin_sell_dollar).toFixed(2),
        "currency_type": req.body.currency_type,
        "meta": meta
    };



    console.log(jsonData);
    jsonData = JSON.stringify(jsonData);

    console.log(jsonData, "jsonData");
    var options = {
        url: apiUrl + 'fix_coin_baserate',
        method: 'POST',
        headers: {
            'Authorization': authorization,
            'Content-Type': 'application/x-www-form-urlencoded'

        },
        form: {jsonData: jsonData},
        json: true,
    };

    request(options, function (err, apiRes, body) {
        console.log(body.data);
        res.redirect('/admin/coinUpdate?ch=1');





    });

});

module.exports = router;
