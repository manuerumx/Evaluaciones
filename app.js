
/**
 * Module dependencies.
 */
var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var fs = require('fs');

//Controllers
var login = require('./controllers/c_login');
var technology  = require('./controllers/c_technology');
//End Controllers

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon(__dirname + '/public/ico/favicon.ico'));
app.use(express.logger('dev'));
/*
Production Setting
var access_logfile = fs.createWriteStream('./log/access.log', {flags: 'a'});
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

//Login
app.get('/', login.index);
app.post('/', login.index);
app.get('/login', login.login);

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