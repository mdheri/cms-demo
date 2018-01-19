var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'home' });
});

router.get('/auth', function(req, res, next) {
  res.render('auth', { title: 'auth' });
});






var userSchema = mongoose.Schema({
    email: String,
    password: String 
});

var User = mongoose.model('User', userSchema);


router.post('/auth/register', function(req, res, next) {
  	
  	var newuser = new User({ email: req.body.email , password:req.body.password  });

	newuser.save(function (err, user) {
		if (err) return console.error(err);
	});
	res.redirect("/admin");
	res.end();

});

router.post('/auth/login', function(req, res, next) {
	console.log("hello");
  	

  	mongoose.User.find({email:res.body.email},function (err, user) {
  		if(user.password == res.body.password)res.redirect("/admin");

	});
	res.redirect("/auth");

	res.end();
	

});








module.exports = router;
