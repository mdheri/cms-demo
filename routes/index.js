var express = require('express');
var User = require('../models/user');
var pagesModel = require('../models/page');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'home' });
});

router.get('/auth', function(req, res, next) {
  res.render('auth', { title: 'auth' });
});


router.post('/auth/register', function(req, res, next) {
  	
  	var newuser = new User({ email: req.body.email , password:req.body.password  });

	newuser.save(function (err, user) {
		if (err) return console.error(err);
		req.session.user = user;

	});

	res.redirect("/admin");
	res.end();

});

router.post('/auth/login', function(req, res) { 
  	User.findOne({email:req.body.email},function (err, user) {
  		
		if(err) return res.redirect('/auth');
  		if(user != null && user.password == req.body.password){
  			req.session.user = user;
  			return res.redirect("/admin");
		}
		return res.redirect("/auth");
		res.end();

	});

	

});

router.get('/logout', function(req, res) {
	req.session.reset();
	res.redirect('/');
});

router.get('/:page', function(req, res) {
	pagesModel.findOne({url:req.params.page.trim()}, function(err,page){
		if(err) return res.send(err);
		if(page){
			if(!page.visable)return res.send("Page is currently not on display")
		
			res.render('newpagetemplate', { title: page.title, content: page.content,useremail:page.useremail});
		}
		else{
			res.send("404 error, Page not Found");
		}
	});
});








module.exports = router;
