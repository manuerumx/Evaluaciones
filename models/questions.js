var Schema = require('mongoose').Schema;

var questionsSchema = new Schema({
	subtopic_id 		: 	[{type: Schema.Types.ObjectId, ref: 'SubTopics'}],
	question 			: 	String,
	createdDate 		: 	Date,
	info : {
		modifyDate : { 
			type		: 	Date, 
			default		: 	Date.now 
		}
	},
	modifyby 		: 	[{type: Schema.Types.ObjectId, ref: 'Users'}],
	answers : [{
		answer			: 	String,
		correct			: 	Boolean
	}]
});

module.exports = questionsSchema;