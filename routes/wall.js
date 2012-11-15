
exports.index = function(req, res){

	var url = require('url')
		, http = require('http')
	  	, path = require('path')
	  	, $ = require('jquery');

	var urlParts = url.parse(req.url, true);
	var query = urlParts.query;
	var accessToken = query["access_token"];

	res.render('wall', { token: accessToken });

};

exports.tickets = function(req, res) {

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
		url: 'https://www.assembla.com/v1/spaces/brightpt/tickets/milestone/' + milestoneId + '.json', 
		type: 'GET',
		dataType: 'json',
		beforeSend: function(xhr) {
			xhr.setRequestHeader('authorization', 'Bearer ' + accessToken); 
		},
		success: function(data) {
			res.send(data, 200);
		}
	});

};