var mongoose = require('mongoose');



var schema = mongoose.Schema({
    email: String,
    password: String 
});

var model = mongoose.model('User', schema);

module.exports = model;

