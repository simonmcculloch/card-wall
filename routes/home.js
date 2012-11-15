

exports.index = function(req, res) {
	if(!req.session.access_token)
		res.redirect('/login');
	else
		res.redirect('/wall?access_token=' + access_token);
}