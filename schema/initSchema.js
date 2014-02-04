var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({	
	username = String,
	email = String,
	name = String,
	middlename = String,
	surename = String,
	createdDate = Date,
	updated = Date,
	active = Boolean
	usertype = {
		evaluated = Boolean,
	}
});

/*
var testTypeSchema = new Schema({
	testtype = String
});
*/

var areaSchema = new Schema({
	areaname = String,
	areadesc = String
});

var 