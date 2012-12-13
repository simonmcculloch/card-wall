
exports.index = function(req, res) {

	var assembla = require('../assembla');

	var milestoneId = req.params.milestoneId;

	console.log('Requesting tickets for Milestone ' + milestoneId);
	
	assembla.get(req, res, 'tickets/milestone/' + milestoneId + '.json?per_page=1000');

};

exports.statuses = function(req, res) {

	var assembla = require('../assembla');

	var milestoneId = req.params.milestoneId;

	console.log('Requesting ticket statues');
	
	assembla.get(req, res, 'tickets/statuses.json');

};

