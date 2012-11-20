
exports.index = function(req, res) {

	var assembla = require('../assembla');

	var milestoneId = req.params.milestoneId;

	console.log('Requesting tickets for Milestone ' + milestoneId);
	
	assembla.get(req, res, 'tickets/milestone/' + milestoneId + '.json');

};