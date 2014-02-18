var Schema = require('mongoose').Schema;
var topicSchema = new Schema({
	technology_id 		: 	[Schema.Types.ObjectId],
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
module.exports = topicSchema;