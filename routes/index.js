var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET Hello world page */
router.get('/helloworld', function(req, res){
	res.render('helloworld', { title: 'Hello, World!'});
});

router.get('/newuser', function(req, res) {
	res.render('newuser', { title: 'Add New User'});
});

router.post('/adduser', function(req, res) {
	var db = req.db;

	var userName = req.body.username;
	var userMail = req.body.useremail;

	var collection = db.get('usercollection');

	collection.insert({
		"username": userName,
		"email": userMail
	}, function(err, doc) {
		if (err) {
			//if failure return error
			res.send("There was a problem adding info to db");
		}
		else {
			//if it worked set the header
			res.location('userlist');
			// Forward to userlist
			res.redirect('userlist');
		}
	});

});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});



module.exports = router;
