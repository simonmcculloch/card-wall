
exports.index = function(req, res){

	res.send('wall', 200);
/*	var url = require('url')
		, http = require('http')
	  	, path = require('path')
	  	, $ = require('jquery');

	var urlParts = url.parse(req.url, true);
	var query = urlParts.query;
	var accessToken = query["access_token"];

	res.render('wall', { token: accessToken });
*/
};