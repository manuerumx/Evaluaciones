//Initializing the connection
var mongoose 	= require('mongoose');
var ObjectId 	= require('mongoose').Types.ObjectId;
var conf  		= require('../config');
var db_lnk 		= conf.mongoSrv();
var db 			= mongoose.createConnection(db_lnk);

//Creating variables to load the model
var technology_schema = require('../models/technology');
var Technology = db.model('Technology', technology_schema);


exports.index = function (req, res, next){
	Technology.find(gotTechnologys);
	function gotTechnologys(err, technologys){
		if(err){
			console.log(err);
			return next();
		}
		return res.render('technology/tech_list', 
			{title: 'Lista de Tecnologias', technologys: technologys});
	}
}

exports.show_edit = function (req, res, next){
	var id = req.params.id;	
	if ( id.match(/^[0-9a-fA-F]{24}$/) ) {
		Technology.findById(id, gotTechnology).populate('modifyby');
	}else{
		return res.render('Error', {error: 'Id incorrecto o mal formado'});
	}
	function gotTechnology (err, technologys) {
		if (err) {
			console.log(err);
			return next(err);
		}
		return res.render('technology/tech_edit', 
			{title: 'Ver Tecnologias',  technologys: technologys});
	}
}

exports.update = function (req, res, next){
	var id = req.params.id;
	var f_technology 		= req.body.technology     || '';
	var f_technologyDesc 	= req.body.techdesc       || '';
	var f_modifyby			= req.session.userid      || '';
	//Validamos
	if((f_technology ==='') || (f_technologyDesc==='')){		
		return res.render('Error', {error: 'Error, Empty Fields'});
	}
	if (id.match(/^[0-9a-fA-F]{24}$/) && f_modifyby.match(/^[0-9a-fA-F]{24}$/)) {
		Technology.findById(id, gotTechnology);
	}else{
		return res.render('Error', {error: 'Id incorrecto'});
	}	
	function gotTechnology (err, technology) {
		if(err){
			console.log(err);
			return next(err);
		}
		if(!technology){
			return res.render('Error', {error: 'Error,Invalid ID'});
		}else{
			technology.technology = f_technology;
			technology.technologyDesc = f_technologyDesc;
			technology.modifyby = f_modifyby;
			technology.save(onSaved);
		}		
	}
	function onSaved (err) {
		if (err) {
			console.log(err)
			return next(err)
		}
		return res.redirect('/technology/' + id)
	}
}

/*exports.remove = function (req, res, next){ }*/

exports.create = function (req, res, next){
	var today = new Date();
	if (req.method === 'GET') {
		return res.render('technology/tech_edit', 
			{title: 'Agregar Tecnologias', technologys: {}
		});
	}else if (req.method==='POST') {
		var f_technology 		= req.body.technology     || '';
		var f_technologyDesc 	= req.body.techdesc       || '';
		var f_modifyby			= req.body.modifyby       || '';
		//Validamos
		if((f_technology ==='') || (f_technologyDesc==='')){
			return res.render('Error', {error: 'Error, There empty fields'});
		}
		// Creamos el documento y lo guardamos
		var tech = new Technology({
			technology 			: 	f_technology,
			technologyDesc 		: 	f_technologyDesc,
			createdDate 		: 	today,
			modifyby 			: 	ObjectId('52f557a610f43b483445f0e2')			/*Mi ID de usuario hardcodeado*/
		});
		tech.save(onSaved);
		function onSaved (err) {
	      if (err) {
	        console.log(err);
	        return next(err);
	      }
	      return res.redirect('/technology/list');
	    }
	}	
}