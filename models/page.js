var mongoose = require('mongoose');


var schema = mongoose.Schema({
    title: String,
    content: String,
    url: String,
    date: String,
    user: String,
    useremail: String,
    visable: Boolean
});

var model = mongoose.model('Page', schema);

module.exports = model;
