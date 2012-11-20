
exports.get = function(req, res, resource, accessToken) {

	var $ = require('jquery');
	var url = 'https://api.assembla.com/v1/spaces/brightpt/' + resource;

	console.log('Url is: ' + url);

	$.ajax({
		url: url, 
		type: 'GET',
		dataType: 'json',
		beforeSend: function(xhr) {
			console.log('Setting auth header to: ' + accessToken);
			xhr.setRequestHeader('authorization', 'Bearer ' + accessToken); 
		},
		success: function(data) {
			console.log('Success!');
			res.send(data, 200);
		},
		error: function(xhr, status, error) {
			console.log('ERROR :( ' + status + ' - ' + error);
			res.send(error, 500);
		}
	});

}