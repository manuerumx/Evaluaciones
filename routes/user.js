//Initializing the connection
var mongoose 	= require('mongoose');
var conf  		= require('../config');
var db_lnk 		= conf.mongoSrv();
//var db 			= mongoose.createConnection(db_lnk);



exports.list = function(req, res){
  
  	console.log(db_lnk);

	res.send("respond with a resource");
};