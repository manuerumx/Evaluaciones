
/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var technology  = require('./controllers/c_technology');
var http = require('http');
var path = require('path');
var app = express();

var fs = require('fs');
var access_logfile = fs.createWriteStream('./log/access.log', {flags: 'a'});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon(__dirname + '/public/ico/favicon.ico'));
app.use(express.logger('dev'));
/*
Production Setting
app.use(express.logger({stream: access_logfile }));
*/
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//Routes
app.get('/', routes.index);
app.get('/users', user.list);

//Cat Technology
app.get('/technology-list/', technology.index);
app.get('/technology/:id', technology.show_edit);
app.post('/technology/:id', technology.update);
app.post('/technology-new/', technology.create);
app.get('/technology-new/', technology.create);

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});



//Init MongoDb
//mongod --dbpath "C:/mongodb/data/db/"