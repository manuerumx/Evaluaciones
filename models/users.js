var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({	
	username 		: 		String,
	password		: 		String,
	email 			: 		String,
	name 			: 		String,
	lastname 		: 		String,
	lastname2 		: 		String,
	createdDate 	: 		Date,
	updated 		: 		Date,
	active 			: 		Boolean,
	contact : {
		homephone 	: 		String,
		cellphone 	: 		String,
		altemail 	: 		String
	},
	address : {
		street 		: 		String,
		number 		: 		String,
		colony 		: 		String,
		zipcode 	: 		String,
		State 		: 		String
	}
});

module.exports = userSchema;