var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({	
	username 		: 		String,
	password		: 		String,
	email 			: 		String,
	name 			: 		String,
	middlename 		: 		String,
	surename 		: 		String,
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

exports.userSchema = userSchema;