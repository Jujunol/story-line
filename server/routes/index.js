/// <reference path="../../typings/tsd.d.ts" />

var express = require('express');
var mongoose = require('mongoose');
var fs = require('fs');
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
    fs.readFile(req.files.displayImage.path, function(error, data) {
        if(error) throw error;
        var uploadPath = "/public/uploads/" + req.files.displayImage.filename;
        fs.writeFile(uploadPath, data, function(error) {
            res.redirect("back");
        });
    });
});

module.exports = router;
