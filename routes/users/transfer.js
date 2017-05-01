require(".././common.js");


router.post('/transfer', start, function (req, res, next) {


    var jsonData = {
        "user_id": req.body.user_id,
        "to_user_id": req.body.to_user_id,
        "user_type": "1",
        "no_of_cointransferred": req.body.no_of_cointransferred,
        "transaction_type": "1",
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
        form: { jsonData: jsonData },
        json: true,
    };

    request(options, function (err, apiRes, body) {
        console.log(body.data.message, "body");

        res.json(body);
    });

});

module.exports = router;
