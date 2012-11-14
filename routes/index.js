
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

	console.log("Code is " + code);

	if(code == undefined){
		console.log('Requesting code...')
		res.redirect('https://api.assembla.com/authorization?client_id=b3VUgQlF4r4RMWacwqjQYw&response_type=code');
	}
	else {
		console.log('Have code: ' + code);
		console.log('Requesting access token...');
		
		$.ajax({
			url: 'https://b3VUgQlF4r4RMWacwqjQYw:cb605bfefe255bc3b3b9c64d3aeb6567@api.assembla.com/token?grant_type=authorization_code&code=' + code, 
			type: 'post',
			success: function(data) { 
						accessToken = data.access_token;
						console.log('Success! Token received: ' + accessToken);

						res.redirect("/wall?access_token=" + accessToken);
					}
		 });
				
	}

	res.render('index', { token: accessToken });

};