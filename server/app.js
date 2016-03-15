/// <reference path="../typings/tsd.d.ts" />

var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var multer = require('multer');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
// var users = require('./routes/users');

var app = express();

// setup our db connection
mongoose.connect('mongodb://root:login@ds056698.mlab.com:56698/lucydb');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Couldn\'t connect to DB'));
db.once('open', function(callback) {
    console.log('Successfully connected to the Database');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(multer({ dest: 'public/uploads/' }).single('image'));

// setup static routing
app.use('/scripts', express.static(path.join(path.dirname(__dirname), 'lib')));
app.use('/images', express.static(path.join(path.dirname(__dirname), 'public/uploads')));
app.use('/res', express.static(path.join(path.dirname(__dirname), 'public')));

// setup routers
app.use('/', routes);
// app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
