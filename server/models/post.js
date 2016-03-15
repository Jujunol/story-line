/// <reference path="../../typings/tsd.d.ts" />

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    title: {
        type: 'String',
        default: '',
        trim: true,
        required: 'A title is required'
    },
    content: {
        type: 'String',
        default: '',
        trim: true
    }
});

exports.Post = mongoose.model('Post', schema);