var Schema = require('mongoose').Schema;

var subTopicSchema = new Schema({
	topic_id 			: 	[{type: Schema.Types.ObjectId, ref: 'Topics'}],
	subTopic 			: 	String,
	subTopicDesc 		: 	String,
	createdDate 		: 	Date,
	info: {
		modifyDate : { 
			type		: 	Date, 
			default		: 	Date.now 
		}
	},
	modifyby 		: 	[{type: Schema.Types.ObjectId, ref: 'Users'}]
});

module.exports = subTopicSchema;