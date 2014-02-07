exports.index = function(req, res){
  res.render('index', { title: 'Bienvenido' });
};

exports.login = function(req, res){
	res.render('login', {title: 'Login'});
}

exports.register = function(req, res){
}