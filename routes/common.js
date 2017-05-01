

start = function start(req, res, next) {


    if (typeof req.session.data == "undefined") {


        res.redirect("/");
    }

    userId = req.session.data._id;


    path = "/users" + req.path;
    ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    agent = useragent.parse(req.headers['user-agent']);
    os = agent.os.toString(); // 'Mac OSX 10.8.1' 
    sess = req.session.data;
//    userId=sess._id;
    meta = {
        "user_ip": ip,
        "user_os": os,
        "location": {
            "lat": "1",
            "lon": "1",
            "location_name": "cbe"
        }
    };


    var options = {
        url: apiUrl + 'get_common_count/' + userId,
        method: 'GET',
        headers: {
            'Authorization': authorization,
        },
        json: true
    };
console.log(userId,"userId------");
    request(options, function (err, apiRes, body) {



        var options = {
            url: apiUrl + 'user/' + userId,
            method: 'GET',
            headers: {
                'Authorization': authorization,
            }
        };

        request(options, function (userErr, userApiRes, userBody) {
            
            userDetails = JSON.parse(userBody).data;
            
            
            
        balance = body.data.data.total_coins_buyed;
         sell_rate = body.data.data.sell_rate;
          buy_rate = body.data.data.buy_rate;
        next();
            
        });

        
    });


}