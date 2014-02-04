var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var topicSchema = new Schema({
	technology_id 		: 	String,
	topic 				: 	String,
	topicDesc 			: 	String,
	createdDate 		: 	Date,
	info: {
		modifyDate : { 
			type		: 	Date, 
			default		: 	Date.now 
		},
		modifyby 		: 	String
	}
});

exports.topicSchema = topicSchema;