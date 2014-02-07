//Initializing the connection
var mongoose 	= require('mongoose');
var conf  		= require('../config');
var db_lnk 		= conf.mongoSrv();
var db 			= mongoose.createConnection(db_lnk);

//Creating variables to load the model

var technology_schema = require('../models/technology');
			   //db.model(modelName, schema):
var Technology = db.model('Technology', technology_schema);

/**
 * @param   {Object}  req
 * @param   {Object}  res
 * @param   {Object}  next
 *																																																																																							
 * @api     public
 *
 * @url     GET       /
 */
exports.index = function (req, res, next){
	Technology.find(gotTechnologys);
	function gotTechnologys(err, technologys){
		if(err){
			console.log(err);
			return next();
		}		
		return res.render('technology/tech_list', {title: 'Lista de Tecnologias', technologys: technologys})
	}
}

exports.show_edit = function (req, res, next){
	var id = req.params.id
	Technology.findById(id, gotTechnology);
	function gotTechnology (err, technologys) {
		if (err) {
			console.log(err);
			return next(err);
		}
		return res.render('technology/tech_edit', {title: 'Ver Tecnologias',  technologys: technologys});
	}
}

exports.update = function (req, res, next){
	var id = req.params.id;
	var f_technology 		= req.body.technology     || '';
	var f_technologyDesc 	= req.body.techdesc       || '';
	var f_modifyby			= req.body.modifyby       || '';
	//Validamos
	if((f_technology ==='') || (f_technologyDesc==='')){
		console.log('Error: Empty fields');
		return res.send('There empty fields');
	}
	Technology.findById(id, gotTechnology);
	function gotTechnology (err, technology) {
		if(err){
			console.log(err);
			return next(err);
		}
		if(!technology){
			console.log('Error: Id not exist');
			return res.send('Invalid ID');
		}else{
			technology.technology = f_technology;
			technology.technologyDesc = f_technologyDesc;
			technology.info.modifyby = f_modifyby;
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

exports.remove = function (req, res, next){
}

exports.create = function (req, res, next){
	var today = new Date();
	if (req.method === 'GET') {
		return res.render('technology/tech_edit', {title: 'Agregar Tecnologias', technologys: {}});
	}else if (req.method==='POST') {
		var f_technology 		= req.body.technology     || '';
		var f_technologyDesc 	= req.body.techdesc       || '';
		var f_modifyby			= req.body.modifyby       || '';
		//Validamos
		if((f_technology ==='') || (f_technologyDesc==='')){
			console.log('Error: Empty fields');
			return res.send('There empty fields');
		}
		// Creamos el documento y lo guardamos
		var tech = new Technology({
			technology 			: 	f_technology,
			technologyDesc 		: 	f_technologyDesc,
			createdDate 		: 	today,
			info: {
				modifyby 		: 	"Manuel González"
			}
		});
		tech.save(onSaved);
		function onSaved (err) {
	      if (err) {
	        console.log(err);
	        return next(err);
	      }
	      return res.redirect('/technology-list/');
	    }
	}	
}