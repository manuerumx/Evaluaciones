var Schema = require('mongoose').Schema;

var assessmentsSchema = new Schema({
	name 				: 	String,
	instructions		: 	String,	
	availability : {
		startdate		: 	Date,
		enddate			: 	Date,
	},
	questions			: 	[String],
	info : {
		modifyDate : { 
			type		: 	Date, 
			default		: 	Date.now 
		},
		modifyby 		: 	String
	}
});

module.exports = assessmentsSchema;