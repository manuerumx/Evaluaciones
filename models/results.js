var Schema = require('mongoose').Schema;

var resultsSchema = new Schema({
	user_id 			: 	{type: Schema.Types.ObjectId, ref: 'Users'},
	assessments_id		: 	{type: Schema.Types.ObjectId, ref: 'Asessments'}, 
	info: {
		startdate		: 	Date,
		enddate			: 	Date,
		successrate		: 	Number
	},
	detail: {
		question 		: 	String,
		answerUsr		: 	String,
		iscorrect		: 	Boolean,
		expected		: 	String 
	}
});

module.exports = resultsSchema;