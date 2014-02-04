var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionsSchema = new Schema({
	subtopic_id 		: 	String,
	question 			: 	String,
	createdDate 		: 	Date,
	info : {
		modifyDate : { 
			type		: 	Date, 
			default		: 	Date.now 
		},
		modifyby 		: 	String
	},
	answers : [{
		answers			: 	String,
		correct			: 	Boolean
	}]
});

exports.questionsSchema = questionsSchema;