
/*
 * GET home page.
 */

exports.index = function(req, res){
	var url = require('url')
	, http = require('http')
  	, path = require('path')
  	, $ = require('jquery');

	var urlParts = url.parse(req.url, true);
	var query = urlParts.query;
	var code = query["code"];
	var accessToken = query["access_token"];

	var appId = 'b3VUgQlF4r4RMWacwqjQYw';
	var appSecret = 'cb605bfefe255bc3b3b9c64d3aeb6567';

	console.log("Code is " + code);

	if(code == undefined){
		console.log('Requesting code...')
		res.redirect('https://api.assembla.com/authorization?response_type=code&client_id=' + appId);
	}
	else {
		console.log('Have code: ' + code);

		var base64 = new Buffer(appId + ':' + appSecret).toString('base64');

		console.log('Requesting access token with base64 auth: ' + base64);
		
		$.ajax({
			url: 'https://api.assembla.com/token?grant_type=authorization_code&code=' + code,
			type: 'POST',
			dataType: 'json',
			beforeSend: function(xhr) {
							xhr.setRequestHeader('authorization', 'basic ' + base64); 
						},
			error: function() {
					console.log('Access Token request failed.');
					}
			success: function(data) { 
						accessToken = data.access_token;
						console.log('Success! Token received: ' + accessToken);

						res.redirect("/wall?access_token=" + accessToken);
					}
			});
	}

	res.render('index', { token: accessToken });

};