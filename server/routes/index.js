/// <reference path="../../typings/tsd.d.ts" />

var post = require('../models/post');

var router = require('express').Router();

router.get('/', function(req, res, next) {
    post.find(function(error, posts) {
        if(error) throw error;
        res.render('index', {
            title: "Timeline Story - A story about a girl named Sophia",
            posts: posts
        });
    });
});

router.get('/create', function(req, res, next) {
    res.render('upload', {
        title: "Unavailable",
        posts: {}
    });
});

// uploaded image
router.post('/create', function(req, res, next) {
    var data = {
        content: req.body.content,
        created: req.body.postDate
    };
    if(req.file) {
        data.image = req.file.filename;
    }
    post.create(data, function(error) {
        if(error) {
            console.log("Unable to create post");
            console.log(error);
            throw error;
        }
    });
    res.redirect("/");
});

// 404 error catch
var error404 = function(req, res, next) {
    res.redirect('/');
};
router.get('*', error404).post('*', error404);

module.exports = router;
