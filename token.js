
exports.parse = function(req, res, next) {

	var url = require('url')

	var urlParts = url.parse(req.url, true);
	var query = urlParts.query;
	var accessToken = query["access_token"];

	req.params.accessToken = accessToken;

	next();
}