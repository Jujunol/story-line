/// <reference path="../../typings/tsd.d.ts" />

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    username: {
        type: String,
        default: '',
        trim: true,
        required: 'Username is required'
    },
    created: {
        type: Date,
        default: Date.now
    }
});

schema.plugin(require('passport-local-mongoose'));

module.exports = mongoose.model('Admin', schema);