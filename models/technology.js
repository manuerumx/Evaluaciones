var Schema = require('mongoose').Schema;
var technologySchema = new Schema({
	technology 			: 	String,
	technologyDesc 		: 	String,
	createdDate 		: 	Date,
	info: {
		modifyDate : { 
			type		: 	Date, 
			default		: 	Date.now
		}		
	},
	modifyby 		: 	[{type: Schema.Types.ObjectId, ref: 'Users'}]
});
module.exports = technologySchema;