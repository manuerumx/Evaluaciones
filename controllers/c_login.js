exports.index = function(req, res){
  res.render('index', { title: 'Evaluaciones' });
};

exports.login = function(req, res){
	res.render('login', {title: 'Login'});
}