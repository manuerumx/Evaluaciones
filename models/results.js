var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var resultsSchema = new Schema({
	user_id 			: 	String,
	assessments_id		: 	String, 
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