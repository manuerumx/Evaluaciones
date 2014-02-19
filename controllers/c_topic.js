//Initializing the connection
var mongoose 	= require('mongoose');
var ObjectId 	= require('mongoose').Types.ObjectId;
var conf  		= require('../config');
var db_lnk 		= conf.mongoSrv();
var db 			= mongoose.createConnection(db_lnk);
//Creating variables to load the model
var topic_schema = require('../models/topics');
var Topic = db.model('Topics', topic_schema);

var technology_schema = require('../models/technology');
var Technology = db.model('Technology', technology_schema);


exports.index = function (req, res, next){
	Topic.find(gotTopics).populate('technology_id');
	function gotTopics(err, topics) {
		if(err){
			console.log(err);
			return next();
		}
		return res.render('topic/topic_list', 
			{title: 'Lista de Topicos', topics: topics});
	}
}

exports.show_edit = function (req, res, next){
	var id = req.params.id
	if (id.match(/^[0-9a-fA-F]{24}$/)) {
		Topic.findById(id, gotTopic);
	}else{
		return res.render('Error', {error: 'Id incorrecto'});
	}
	function gotTopic (err, topics) {
		if (err) {
			console.log(err);
			return next(err);
		}
		Technology.find( function (err, techs){ 
			if(err){
				return res.render('Error', {error: 'Error, Find Technology go Wrong - EDIT'});
			}else{
				return res.render('topic/topic_edit', {title: 'Ver Topicos',  topics: topics, techs: techs});
			}
		});
		
	}
}

exports.update = function (req, res, next) {
	var id = req.params.id;
	var f_technology_id = req.body.technology_id || '';
	var f_topic 		= req.body.topic     	 || '';
	var f_topicDesc 	= req.body.topicDesc     || '';
	var f_modifyby		= req.session.userid     || '';
	//Validamos
	if((f_topic ==='') || (f_topicDesc==='')){		
		return res.render('Error', {error: 'Error, Empty Fields'});
	}
	if (id.match(/^[0-9a-fA-F]{24}$/) && f_modifyby.match(/^[0-9a-fA-F]{24}$/)) {
		Topic.findById(id, gotTopic);
	}else{
		return res.render('Error', {error: 'Id incorrecto'});
	}	
	function gotTopic (err, topic) {
		if(err){
			console.log(err);
			return next(err);
		}
		if(!technology){
			return res.render('Error', {error: 'Error,Invalid ID'});
		}else{
			topic.technology_id = "";
			topic.topic = f_topic;
			topic.topicDesc = f_topicDesc;
			topic.modifyby = f_modifyby;
			topic.save(onSaved);
		}		
	}
	function onSaved (err) {
		if (err) {
			console.log(err)
			return next(err)
		}
		return res.redirect('/topic/' + id)
	}
}
/*exports.remove = function (req, res, next){ }*/
exports.create = function (req, res, next) {
	var today = new Date();
	if (req.method === 'GET') {
		Technology.find( function (err, techs){ 
			if(err){
				return res.render('Error', {error: 'Error, Find Technology go wrong'});
			}else{
				return res.render('topic/topic_edit', {title: 'Agregar Topicos', topics: {}, techs: techs});
			}
		});
	} else if (req.method==='POST') {
		var f_technology_id = req.body.technology   || '';
		var f_topic 		= req.body.topic      	|| '';
		var f_topicDesc 	= req.body.topicDesc    || '';
		var f_modifyby		= req.session.userid    || '';
		//Validamos
		if((f_topic ==='') || (f_topicDesc==='')){
			return res.render('Error', {error: 'Error, There empty fields'});
		}
		// Creamos el documento y lo guardamos
		var topc = new Topic({
			technology_id   :   ObjectId(f_technology_id),
			topic 			: 	f_topic,
			topicDesc 		: 	f_topicDesc,
			createdDate 	: 	today,
			modifyby 		: 	ObjectId(f_modifyby)
		});
		topc.save(onSaved);
		function onSaved (err) {
	      if (err) {
	        console.log(err);
	        return next(err);
	      }
	      return res.redirect('/topic/list');
	    }
	}	
}