//var express = require('express');
//var router = express.Router();
//var request = require('request');



//var apiUrl = "http://coin.hapy.mobi/";
//var userId = "58d7dbb4255f4d3c5262a6fb";
//var authorization = "Bearer cV62576T73ryVodC8qyalsIUyUAzzrjzh2YFaAAdHy5k9TdHRW";




require(".././common.js");




/* GET users listing. */
router.get('/shop', start, function (req, res, next) {

    type = req.query.type;

    var jsonData = JSON.stringify({ "product_type": type, "start": 0, "limit": 100 });
    var options = {
        url: apiUrl + 'getallproduct_with_auth',
        method: 'POST',
        headers: {
            'Authorization': authorization,
            'Content-Type': 'application/x-www-form-urlencoded'

        },
        form: { jsonData: jsonData },
        json: true,
    };

    request(options, function (err, apiRes, body) {
        var jsonData = body.data;
        jsonData.path = path;
        jsonData.authorization = authorization;
        console.log(jsonData);
        res.render("users/shop/index", jsonData, function (err, doc) {

            console.log(err);
            res.send(doc);
        });






    });


});


router.get('/shop/view/:id', start, function (req, res, next) {



    var jsonData = JSON.stringify(jsonData);
    var options = {
        url: apiUrl + 'product/' + req.params.id,
        method: 'GET',
        headers: {
            'Authorization': authorization,
            'Content-Type': 'application/x-www-form-urlencoded'

        },
        json: true,
    };

    request(options, function (err, apiRes, body) {
        var jsonData = body.data;
        jsonData.path = path;
        jsonData.authorization = authorization;

        res.render("users/shop/view", jsonData, function (err, doc) {

            console.log(err);
            res.send(doc);
        });






    });


});




router.get('/shop/cart', start, function (req, res, next) {

    var sess = req.session;

    res.render("users/shop/cart", sess, function (err, doc) {
        console.log(err);
        res.send(doc);
    });




});



router.post('/shop/cartqty', start, function (req, res, next) {


    console.log(req.body.productId);
    
     var sess = req.session;
     
    for (var i in sess.cart) {

        if (sess.cart[i].product_id == req.body.productId) {
           sess.cart[i].product_price_detail.quantity=req.body.qty;
        }
    }
    
 res.json({"status":"ok"});
   // var sess = req.session;

    
});




router.get('/shop/cart', start, function (req, res, next) {

    var sess = req.session;

    res.render("users/shop/cart", sess, function (err, doc) {
        console.log(err);
        res.send(doc);
    });




});




router.post('/shop/addcart', start, function (req, res, next) {




    var params = JSON.parse(req.body.params);
    console.log("==========");
    
    params.product_id=params._id;
    params.product_price_detail.quantity=1;
    delete params.product_img;
    delete params.meta;
    delete params.product_status;
    delete params.__v;
    delete params.is_product_available;
    delete params._id;
    console.log(params);
    

    var sess = req.session;


    if (typeof sess.cart == "undefined") {
        sess.cart = [];
    }

    if (sess.cart.length == 0) {
        console.log("1221==========");

        console.log(params);

        sess.cart.push(params);
    }

    var flag = 1;

    for (var i in sess.cart) {

        if (sess.cart[i].product_id == params.product_id) {
            flag = 0;
        }
    }
    if (flag == 1) {
        sess.cart.push(params);
    }
   res.redirect("/users/shop/cart");






});



router.post('/shop/checkout', start, function (req, res, next) {
    console.log("Payment Checkout");

console.log(req.body);

    var paypalInfo = req.body;
    console.log(paypalInfo);

    var cart = req.session.cart;

    var jsonData = {
        "product_ids": cart,
        "transaction_id": paypalInfo.payment_id,
        "user_id": userId,
        "meta": meta,
        "paypal_details":paypalInfo
    };


    console.log(jsonData);

    var jsonData = JSON.stringify(jsonData);
    var options = {
        url: apiUrl + 'purchaseproduct',
        method: 'POST',
        headers: {
            'Authorization': authorization,
            'Content-Type': 'application/x-www-form-urlencoded'

        },
        form: { jsonData: jsonData },
        json: true,
    };

    request(options, function (err, apiRes, body) {
        console.log(body.data.message, "body");
//        cart=[];
        req.session.cart=[];
        res.json(body);
        //   res.redirect('/users/sell')




    });

});



router.get('/shop/:skip/:limit', start, function (req, res, next) {

    var skip = req.params.skip;
    var limit = req.params.limit;
    var jsonData = {};
    var jsonData = JSON.stringify({ "product_type": type, "start": skip, "limit": limit });
    var options = {
        url: apiUrl + 'getallpackage/' + skip + '/' + limit,
        method: 'POST',
        headers: {
            'Authorization': authorization,
            'Content-Type': 'application/x-www-form-urlencoded'

        },
        json: true,
    };

    request(options, function (err, apiRes, body) {
        jsonData = body.data;
        jsonData.path = path;
        res.render("users/shop/page", jsonData, function (err, doc) {

            console.log(err);
            res.send(doc);
        });






    });


});



module.exports = router;
