
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
var topic  = require('./controllers/c_topic');
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
//Cookies
app.use(express.cookieParser());
app.use(express.session({secret: 'S3n01c@ul@V3'}));

app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


//404 Errors
app.use(function(req, res, next){
	res.status(404);
	// respond with html page
	if (req.accepts('html')) {
		res.render('404', { url: req.url });
		return;
	}
	// respond with json
	if (req.accepts('json')) {
		res.send({ error: 'this aren\'t the page you\'re looking for' });
		return;
	}
	// default to plain-text. send()
	res.type('txt').send('Not found');
});
//End 404 Errors

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//Index
app.get('/', login.index);
//Login
app.get('/login', login.login);
app.post('/validate', login.validate);
//linea temporal
//app.get('/register', login.register);
app.get('/register', function(req, res){
	if(typeof(req.session) !== 'undefined'){
		if(req.session.logged==="true"){
			res.redirect('/technology/list');
		}else{
			res.redirect('/login');
		}
	}else{
		res.redirect('/login');
	}
});

//Cat Technology
app.get('/technology/list', technology.index);
app.get('/technology/:id', technology.show_edit);
app.post('/technology/:id', technology.update);
app.post('/technology-new/', technology.create);
app.get('/technology-new/', technology.create);

//Cat Topic
app.get('/topic/list', topic.index);
app.get('/topic/:id', topic.show_edit);
app.post('/topic/:id', topic.update);
app.post('/topic-new/', topic.create);
app.get('/topic-new/', topic.create);


http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});

//Init MongoDb
//mongod --dbpath "C:/mongodb/data/db/"