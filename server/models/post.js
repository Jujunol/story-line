/// <reference path="../../typings/tsd.d.ts" />

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    content: {
        type: 'String',
        default: '',
        trim: true
    },
    image: {
        type: 'String',
        default: null
    }, 
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', schema);