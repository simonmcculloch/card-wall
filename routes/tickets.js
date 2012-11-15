exports.index = function(req, res) {

	var url = require('url')
		, http = require('http')
	  	, path = require('path')
	  	, $ = require('jquery');

	var urlParts = url.parse(req.url, true);
	var query = urlParts.query;
	var accessToken = query["access_token"];
	var milestoneId = query["milestone_id"];	

	console.log('Requesting tickets for Milestone ' + milestoneId);
	console.log('Url is: https://www.assembla.com/v1/spaces/brightpt/tickets/milestone/' + milestoneId + '.json');	
	$.ajax({
		url: 'https://api.assembla.com/v1/spaces/brightpt/tickets/milestone/' + milestoneId + '.json', 
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
		}
	});

};