var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('dashboard', { title: 'admin dashboard', pgname: 'untitled',date: 'Jan 3, 2018', url:'/admin' });
});

router.get('/addpage', function(req, res, next) {
  res.render('addpage', { title: 'addpage' });
});

router.get('/editaccount', function(req, res, next) {
  res.render('accountedit', { title: 'edit account' });
});




var pageSchema = mongoose.Schema({
    title: String,
    content: String,
    url: String 
});

var Page = mongoose.model('Page', pageSchema);



router.post('/addpage/save', function(req, res, next) {
	res.json(req.body);

  	var newpage = new Page({ title: req.body.title , content:req.body.content, url:req.body.url});

	newpage.save(function (err, page) {
	  if (err) return console.error(err);
	});


	res.redirect('/');
	res.end();

});





module.exports = router;
