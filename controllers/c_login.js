//Initializing the connection
var mongoose 	= require('mongoose');
var conf  		= require('../config');
var db_lnk 		= conf.mongoSrv();
var cryp = require('./cryptography');


exports.index = function(req, res){
  res.render('index', { title: 'Bienvenido' });
};

exports.login = function(req, res){
	res.render('login', {title: 'Login', error:''});
}

exports.register = function(req, res){
	var today = new Date();
	var db = mongoose.createConnection(db_lnk);
	var user_schema = require('../models/users');
	var User = db.model('Users', user_schema);

	var usr = new User({
		username   : 'administrador',
		password   : cryp.encrypt('admin'),
		email      : 'manuel@dsindigo.com',
		name       : 'Manuel',
		lastname   : 'González',
		lastname2  : 'Rivera',
		createdDate: today,
		updated    : today,
		active     : true,
		contact: {
			homephone 	: 		'15795611',
			cellphone 	: 		'5551056999',
			altemail 	: 		'mgrivera@gmail.com'
		},
		address: {
			street 		: 		'Detroit',
			number 		: 		'33 Int 14',
			colony 		: 		'Nochebuena',
			zipcode 	: 		'03720',
			State 		: 		'DF'
		}
	});

	usr.save(onSaved);
	function onSaved (err) {
      if (err) {
        console.log(err)
        return next(err)
      }
      return res.redirect('/login')
    }
}

exports.validate = function(req, res){
	if (req.method === 'GET') {
		return res.render('login', {title: 'Login', error:''});
	} else if (req.method === 'POST') {
		var f_email = req.body.email        || '';
		var f_passw = req.body.password     || '';
		if ( (!isValidEmail(f_email) ) || (f_passw === "") )
		{
			console.log("Error: email or password nulls");
			return res.render('login', {title: 'Login', error:'Error: Email invalid'});
		} else {
			
			var db = mongoose.createConnection(db_lnk);
			var user_schema = require('../models/users');
			var User = db.model('Users', user_schema);
			var query = User.findOne({'username': 'f_username'});
			query.select('password email name middlename surename');
			query.exec(function (err, user){
				if(err){
					return handleError(err);
				}else{
					console.log("Lo encontramos");
					console.log("");
				}
			});
		}
	}


	function isValidEmail(emailAddress){
		var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
		return emailAddress.match(pattern);
	}

	function matchPassword(emailAddress,password){
		var passwCryp = cryp.encrypt(password);
	}
}