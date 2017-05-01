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



router.get('/products', start, function (req, res, next) {

type=req.query.type; 

    var jsonData = JSON.stringify({"product_type":type,"start":0,"limit":100});
   
    var options = {
        url: apiUrl + 'getallproduct_with_auth',
        method: 'POST',
        headers: {
            'Authorization': authorization,
        },
          form: {jsonData: jsonData},
    };

    request(options, function (err, apiRes, body) {
        console.log(body, "body----------------------");
        var jsonData = JSON.parse(body).data;

        res.render('admin/products/index', jsonData, function (err, doc) {
            res.send(doc);
            console.log(err, "--err--");


        });
    });

});

router.get('/products/create', start, function (req, res, next) {

  var jsonData={
  "product_title": "",
  "product_description": "",
  "product_price_detail": {
    "product_price": 0,
    "product_totalcoin": 0,
    "product_discount": 0,
    "currency_type": "$",
    "product_discount_available": false
  },
  "is_product_available": true,
  "product_type": "",
  "product_status": ""
  
};
jsonData.data=jsonData;

        res.render('admin/products/create', jsonData, function (err, doc) {
            res.send(doc);
            console.log(err, "--err--");


        });
 

});


router.get('/products/update/:id', start, function (req, res, next) {

 var ch=0;
     if(typeof req.query.ch!='undefined') {
     ch=req.query.ch;     
     }


    var options = {
        url: apiUrl + 'product/' + req.params.id,
        method: 'GET',
        headers: {
            'Authorization': authorization,
        }
    };

    request(options, function (err, apiRes, body) {

        var jsonData = JSON.parse(body).data;
        jsonData.ch =ch;
        res.render('admin/products/update', jsonData, function (err, doc) {
            res.send(doc);
            console.log(err, "--err--");


        });
    });

});



router.post('/products/update', start, function (req, res, next) {


    var jsonData = {
        "product_id": req.body.product_id,
        "product_title":req.body.product_title,
        "product_description": req.body.product_description,
        "product_img":"product_img",
        "product_price_detail": {
            "product_price": parseInt(req.body.product_price),
            "product_totalcoin": parseInt(req.body.product_totalcoin),
            "product_discount": parseInt(req.body.product_discount),
            "currency_type": req.body.currency_type,
            "product_discount_available": JSON.parse(req.body.product_discount_available)
        },
//        "is_package_available": JSON.parse(req.body.is_product_available),
        "product_type": req.body.product_type,
        "product_status": req.body.product_status,
        
        "meta": meta
    };


console.log(jsonData,"jsonData");
    
    var jsonData = JSON.stringify(jsonData);
    var options = {
        url: apiUrl + 'product',
        method: 'PUT',
        headers: {
            'Authorization': authorization,
            'Content-Type': 'application/x-www-form-urlencoded'

        },
        form: {jsonData: jsonData},
        json: true,
    };

    request(options, function (err, apiRes, body) {
console.log(body.data,"body");
        
        res.redirect('/admin/products/update/'+req.body.product_id+'?ch=1')






    });

});



router.post('/products/create/', start, function (req, res, next) {


   
    var jsonData = {
        
        "product_title":req.body.product_title,
        "product_description": req.body.product_description,
        "product_img":"product_img",
        "product_price_detail": {
            "product_price": parseInt(req.body.product_price),
            "product_totalcoin": parseInt(req.body.product_totalcoin),
            "product_discount": parseInt(req.body.product_discount),
            "currency_type": req.body.currency_type,
            "product_discount_available": JSON.parse(req.body.product_discount_available)
        },
//        "is_package_available": JSON.parse(req.body.is_product_available),
        "product_type": req.body.product_type,
        "product_status": req.body.product_status,
        
        "meta": meta
    };


console.log(jsonData);
    
    var jsonData = JSON.stringify(jsonData);
    var options = {
        url: apiUrl + 'product',
        method: 'POST',
        headers: {
            'Authorization': authorization,
            'Content-Type': 'application/x-www-form-urlencoded'

        },
        form: {jsonData: jsonData},
        json: true,
    };

    request(options, function (err, apiRes, body) {
//console.log(body.data.message,"body");
        
        res.redirect('/admin/products')






    });

});



router.get('/products/delete/:id', start, function (req, res, next) {


    

    
    var jsonData = JSON.stringify(jsonData);
    var options = {
        url: apiUrl + 'product/'+req.params.id,
        method: 'DELETE',
        headers: {
            'Authorization': authorization,
            'Content-Type': 'application/x-www-form-urlencoded'

        },
        form: {jsonData: jsonData},
        json: true,
    };

    request(options, function (err, apiRes, body) {
console.log(body.data,"body");
        
        res.redirect('/admin/products')






    });

});

module.exports = router;
