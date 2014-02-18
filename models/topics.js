var Schema = require('mongoose').Schema;
var topicSchema = new Schema({
	technology_id 		: 	[{type: Schema.Types.ObjectId, ref: 'Technology'}],
	topic 				: 	String,
	topicDesc 			: 	String,
	createdDate 		: 	Date,
	info: {
		modifyDate : { 
			type		: 	Date, 
			default		: 	Date.now 
		}		
	},
	modifyby 		: 	[{type: Schema.Types.ObjectId, ref: 'Users'}]
});
module.exports = topicSchema;