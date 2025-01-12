var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//connect mongoose db
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;

mongoose
.connect(db, {useNewUrlParser: true})
.then( () => console.log("connected to MongoDB"))
.catch((err) => console.log(err));


var indexRouter = require('./routes/index');
var reservationsRouter = require('./routes/reservations');
var testRouter = require('./routes/test');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/reservations', reservationsRouter);
app.use('/test', testRouter);

// catch 404 and forward to error handlers
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
