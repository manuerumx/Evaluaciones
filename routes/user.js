
/*
 * GET users listing.
 */
var mongoose = require('mongoose');
var db_lnk = 'mongodb://localhost/evaluaciones';
var db = mongoose.createConnection(db_lnk);


exports.list = function(req, res){
  
  	
  	var kittySchema = mongoose.Schema({
	    name: String
	});
		

	res.send("respond with a resource");
};