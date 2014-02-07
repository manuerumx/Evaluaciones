var cryp = require('./cryptography');

exports.index = function(req, res){
  res.render('index', { title: 'Bienvenido' });
};

exports.login = function(req, res){
	res.render('login', {title: 'Login', error:''});
}

exports.register = function(req, res){
}

exports.validate = function(req, res){
	if (req.method === 'GET') {
		return res.render('login', {title: 'Login', error:''});
	} else if (req.method === 'POST') {
		var f_email = req.body.email        || '';
		var f_passw = req.body.password     || '';
		if ( (!isValidEmail(f_email) ) || (f_passw === "") )
		{
			console.log("Error: email or password nulls");
			return res.render('login', {title: 'Login', error:'Error: Email invalid'});
		} else {
			return res.send('Iniciamos la validación contra Mongo');
		}
	}


	function isValidEmail(emailAddress){
		var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
		return emailAddress.match(pattern);
	}

	function matchPassword(emailAddress,password){
		var passwCryp = cryp.encrypt(password);
	}
}