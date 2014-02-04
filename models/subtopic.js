var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subTopicSchema = new Schema({
	topic_id 			: 	String,
	subTopic 			: 	String,
	subTopicDesc 		: 	String,
	createdDate 		: 	Date,
	info: {
		modifyDate : { 
			type		: 	Date, 
			default		: 	Date.now 
		},
		modifyby 		: 	String
	}
});

exports.subTopicSchema = subTopicSchema;