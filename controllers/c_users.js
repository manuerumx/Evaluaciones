//Initializing the connection
var mongoose 	= require('mongoose');
var conf  		= require('../config');
var db_lnk 		= conf.mongoSrv();
var db 			= mongoose.createConnection(db_lnk);

//Creating variables to load the model

var users_schema = require('../models/users');
var Users = db.model('Users', users_schema);

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

}

exports.show_edit = function (req, res, next){

}

exports.update = function (req, res, next){

}

exports.remove = function (req, res, next){

}

exports.create = function (req, res, next){

}