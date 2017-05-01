
express = require('express');
router = express.Router();
request = require('request');
useragent = require('useragent');
session = require('express-session')

apiUrl = "http://coinapi.hapy.mobi/";
// userId = "58e3730ab695c06703688e85";
authorization = "Bearer 8ljkCFUd0wRQTjQYlF6BKKce7OUnakwCyBF5XUgf11fqkfXUZZ";



var path = require("path");

filepath = path.resolve(__dirname);














var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');

var index = require('./routes/index');
var users = require('./routes/users');
var sell = require('./routes/users/sell');
var myaccount = require('./routes/users/myaccount');
var shop = require('./routes/users/shop');
var withdrawn = require('./routes/users/withdrawn');
var fileUpload = require('express-fileupload');
var transfer = require('./routes/users/transfer');



var admin = require('./routes/admin');
var package = require('./routes/admin/package');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

app.set('trust proxy', 1) // trust first proxy 
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,

}))



app.use('/', index);
app.use('/users', users);
app.use('/users', sell);
app.use('/users', myaccount);
app.use('/users', shop);
app.use('/users', withdrawn);
app.use('/users', require('./routes/users/information'));
app.use('/users', require('./routes/users/tranhistory'));
app.use('/users', transfer);



app.use('/admin', admin);
app.use('/admin', package);




//app.set('trust proxy', 1) // trust first proxy 


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
 
 
module.exports = app;
