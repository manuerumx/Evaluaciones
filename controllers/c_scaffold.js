//Initializing the connection
var mongoose 	= require('mongoose');
var conf  		= require('../config');
var db_lnk 		= conf.mongoSrv();
var cryp = require('./cryptography');
var db = mongoose.createConnection(db_lnk);
var user_schema = require('../models/users');
var User = db.model('Users', user_schema);
var technology_schema = require('../models/technology');
var Technology = db.model('Technology', technology_schema);
var topic_schema = require('../models/topics');
var Topic = db.model('Topics', topic_schema);
var today = new Date();
var usrId;


exports.rellena = function(req, res){
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
	usr.save( function (err, result){
		usrId = result._id;
	});
	console.log(usrId);
	
	var tech = new Technology({
		technology : 'Java', technologyDesc : 'Maquina Virtual de Java',createdDate : today, modifyby : ObjectId(usrId)
	});
	tech.save();

	var tech = new Technology({
		technology : 'Sql Server', technologyDesc : 'Motor de Base de Datos MSSQL',createdDate : today, modifyby : ObjectId(usrId)
	});
	tech.save();


	function isValidEmail(emailAddress){
		var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
		return emailAddress.match(pattern);
	}

	function onFinish(err){
		db.close();
		return res.redirect('/login');
	}
}