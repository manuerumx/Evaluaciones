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

	}
});