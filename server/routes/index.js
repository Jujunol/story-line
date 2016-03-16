/// <reference path="../../typings/tsd.d.ts" />

var express = require('express');
var mongoose = require('mongoose');
var postModel = require('../models/post');

var router = express.Router();
var post = postModel.Post;

router.get('/', function(req, res, next) {
    post.find(function(error, posts) {
        if(error) throw error;
        res.render('index', {
            title: "A story about a girl named Sophia",
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

module.exports = router;
