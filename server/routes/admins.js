/// <reference path="../../typings/tsd.d.ts" />

var express = require('express');
var passport = require('passport');
var Admin = require('../models/admin');

var router = express.Router();

// Landing page
router.get('/', notLoggedIn, function(req, res, next) {
    res.render('admin/index', {
        title: "Content Locked",
        user: req.user
    });
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/admin/dashboard',
    failureRedirect: '/admin'
}));

// Create a new admin
router.get('/create', function(req, res, next) {
    res.render('admin/create', {
        title: "Create new user",
        user: req.user
    });
});

router.post('/create', function (req, res, next) {
    Admin.register(new Admin({ 
        username: req.body.username
    }), req.body.password, function (err, user) {
        if(err) {
            console.log(err);
        }
        return res.redirect('/admin');
    })
});

// Admin dashboard
router.get('/dashboard', loggedIn, function(req, res, next) {
    Admin.find(function(err, admins) {
        res.render('admin/dashboard', {
            title: "Dashboard",
            user: req.user,
            admins: admins
        });
    });
});

// Logout
router.get('/logout', function (req, res, next) {
    req.logout();
    return res.redirect('/');
})

// View Admin page
router.get('/:admin', loggedIn, function(req, res, next) {
    Admin.find({ username: req.params.admin }, function (err, admins) {
        if(err || admins.length != 1) {
            return res.redirect('/admin/dashboard');
        }
        res.render('admin/profile', {
            title: 'Admin Profile',
            admin: admins[0]
        });
    });
});

router.get('/:admin/delete', loggedIn, function(req, res, next) {
    Admin.find({ username: req.params.admin }, function (err, admins) {
        if(err | admins.length != 1) {
            return res.redirect('/admin/dashboard');
        }
        admins[0].remove();
        res.redirect('/admin/dashboard');
    });
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
