//var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var technologySchema = new Schema({
	technology 			: 	String,
	technologyDesc 		: 	String,
	createdDate 		: 	Date,
	info: {
		modifyDate : { 
			type		: 	Date, 
			default		: 	Date.now
		},
		modifyby 		: 	String
	}
});

module.exports = technologySchema;
//exports.technologySchema = technologySchema;