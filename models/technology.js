var Schema = require('mongoose').Schema;
var technologySchema = new Schema({
	technology 			: 	String,
	technologyDesc 		: 	String,
	createdDate 		: 	Date,
	info: {
		modifyDate : { 
			type		: 	Date, 
			default		: 	Date.now
		},
		modifyby 		: 	[Schema.Types.ObjectId]
	}
});
module.exports = technologySchema;