var express = require('express');
var pagesModel = require('../models/page');
var userModel = require('../models/user');
var session = require('client-sessions');
var auth = require('../utils/auth');

var router = express.Router();

router.use(auth.requireLogin)

router.get('/', function(req, res, next) {
	pagesModel.find({user:req.user._id}, function (err, pages){
  		res.render('dashboard', { title: 'admin dashboard', page: pages});
});
});

router.get('/addpage', function(req, res, next) {
  res.render('addpage', {title: 'addpage'});
});

router.get('/editaccount', function(req, res, next) {
  res.render('accountedit', {title: 'edit account'});
});

router.post('/editaccount/save', function(req, res, next) {

	userModel.update({ _id: req.user._id }, { $set: { email: req.body.email, password:req.body.password}}, function (err, user){
		if(err) return res.send(err);
		 userModel.findById(user._id,function (err, newuser) {

			req.session.user = newuser;
		});
	});
	return res.redirect('/admin');
});

router.post('/delete', function(req, res) {
	pagesModel.remove({_id:req.body.page}, function (err){
		if(err) return res.send(err);
	});
	return res.redirect('/admin');
});

router.post('/editpage', function(req, res) {
	pagesModel.findById(req.body.page, function (err,page){
		res.render('editpage', {title: 'editpage', pages: page});
	});
});

router.post('/editpage/save', function(req, res) {
	pagesModel.update({_id:req.body.page._id}, { $set: { title: req.body.title,content: req.body.content, url:req.body.url}}, function (err,user){
		if(err) return res.send(err);
	});

	return res.redirect('/admin');

});


router.post('/visability', function(req, res) {
	pagesModel.findById(req.body.page, function (err,page){
		if(err) return res.send(err);
		if(page.visable){
			pagesModel.update({ _id: req.body.page }, { $set: { visable: false }}, function (err, pages){
				if(err) return res.send(err);
			});
		}else{
			pagesModel.update({ _id: req.body.page }, { $set: { visable: true }}, function (err, pages){
				if(err) return res.send(err);
			});
		}
	});
	return res.redirect('/admin');

});


router.post('/addpage/save', function(req, res) {
	var current_date = new Date();
	console.log(current_date);

  	var newpage = new pagesModel({title: req.body.title , content:req.body.content,
  	 url:req.body.url, date:Date(), user:req.user._id, useremail:req.user.email, visable:true});

	newpage.save(function (err, page) {
		if (err) return console.error(err);

	});

	res.redirect('/admin');



});





module.exports = router;
