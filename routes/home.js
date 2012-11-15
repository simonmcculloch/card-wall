

exports.index = function(req, res) {

	var url = require('url')
	, http = require('http')
  	, path = require('path')
  	, $ = require('jquery');

	var urlParts = url.parse(req.url, true);
	var query = urlParts.query;
	var access_token = query["access_token"];

	if(!(req.session.access_token || access_token))
		res.redirect('/login');
	else
		res.redirect('/wall?access_token=' + access_token);
}