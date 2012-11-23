
exports.get = function(req, res, resource) {

	var $ = require('jquery');
	var url = 'https://api.assembla.com/v1/spaces/brightpt/' + resource;
	var accessToken = req.params.accessToken;

	console.log('Url is: ' + url);

	$.ajax({
		url: url, 
		type: 'GET',
		dataType: 'json',
		cache: false,
		beforeSend: function(xhr) {
			console.log('Setting auth header to: ' + accessToken);
			xhr.setRequestHeader('authorization', 'Bearer ' + accessToken); 
		},
		success: function(data, status, xhr) {
			console.log('Success! ' + xhr.status);
			res.send(data, 200);
		},
		error: function(xhr, status, error) {
			console.log('ERROR :( ' + xhr.status + ' - ' + xhr.statusText);
			res.send(error, xhr.status);
		}
	});

}