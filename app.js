const mongoose = require('mongoose');

const Contact = require('./models/contact');

const url = 'mongodb://localhost:27017/PhonebookServer';
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log("Connected correctly to server");
}, (err) => { console.log(err); });




var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require("body-parser");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var contactRouter = require('./routes/contactRouter');

var app = express();
const cors = require('cors');
const morgan = require('morgan');
// const app = express();

app.use(cors());
app.use(morgan('dev'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    return res.status(200).json({});
  };
  next();
});



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contact', contactRouter);







// Enable CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Headers", "x-requested-with, content-type");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Max-Age", "1000000000");
  // intercept OPTIONS method if ('OPTIONS' == req.method) { res.send(200); } else { next(); } });
});



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
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
