var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

exports.technologySchema = technologySchema;