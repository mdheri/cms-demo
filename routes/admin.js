var express = require('express');
var pagesModel = require('../models/page');
var session = require('client-sessions');


var router = express.Router();

function requireLogin (req, res, next) {
  if (!req.user) {
    res.redirect('/auth');
  } else {
    next();
  }
};


router.get('/',requireLogin, function(req, res, next) {
	pagesModel.find({user:req.session.user._id}, function (err, pages){
  		res.render('dashboard', { title: 'admin dashboard', page: pages});
});
});

router.get('/addpage',requireLogin, function(req, res, next) {
  res.render('addpage', { title: 'addpage' });
});

router.get('/editaccount',requireLogin, function(req, res, next) {
  res.render('accountedit', { title: 'edit account' });
});

router.get('/delete',requireLogin, function(req, res) {
	return res.redirect('/admin');
});

router.get('/editpage',requireLogin, function(req, res) {
	return res.redirect('/admin');
});

router.get('/visability',requireLogin, function(req, res) {
	return res.redirect('/admin');
});


router.post('/addpage/save',requireLogin, function(req, res) {
	res.json(req.body);
	var current_date = new Date();
	console.log(current_date);

  	var newpage = new pagesModel({title: req.body.title , content:req.body.content,
  	 url:req.body.url, date:Date(), user:req.session.user._id, useremail:req.session.user.email});

	newpage.save(function (err, page) {
		if (err) return console.error(err);
	});

	res.redirect("/admin");
	res.end();

});





module.exports = router;
