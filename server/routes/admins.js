/// <reference path="../../typings/tsd.d.ts" />

var express = require('express');
var passport = require('passport');
var admin = require('../models/admin');

var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('admin/index', {
        title: "Content Locked",
        user: req.user
    });
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/admin/dashboard',
    failureRedirect: '/admin'
}));

router.get('/dashboard', function(req, res, next) {
    res.end("hello world");
});

// 404 catch
var error404 = function (req, res, next) {
    res.redirect('/admin');
};
router.get('*', error404).post('*', error404);


function notLoggedIn(req, res, next) {
    if(!req.user) {
        next();
    }
    else {
        res.redirect('/admin/dashboard');
    }
}

function loggedIn(req, res, next) {
    if(req.user) {
        next();
    }
    else {
        res.redirect('/admin');
    }
}

module.exports = router;
