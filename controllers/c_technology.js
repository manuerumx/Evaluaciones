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
		return res.render('techs', {title: 'Lista de Tecnologias', technologys: technologys})
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
		return res.render('tech_edit', {title: 'Ver Tecnologias',  technologys: technologys});
	}
}

exports.update = function (req, res, next){
	var id = req.params.id;
	
}

exports.remove = function (req, res, next){

}

exports.create = function (req, res, next){
	var today = new Date();
	var tech = new Technology({
		technology 			: 	"Java",
		technologyDesc 		: 	"Lenguaje basado en la JVM",
		createdDate 		: 	today,
		info: {

			modifyby 		: 	"Manuel González"
		}

	});
	tech.save(onSaved);
	function onSaved (err) {
      if (err) {
        console.log(err)
        return next(err)
      }

      return res.redirect('/')
    }
}