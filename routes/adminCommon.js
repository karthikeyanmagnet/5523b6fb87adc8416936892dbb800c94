

start = function start(req, res, next) {
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