
exports.index = function(req, res) {
	
	var url = require('url')
	, assembla = require('../assembla');

	var milestoneId = req.params.id;
	console.log('Requesting Milestone ' + milestoneId);
	
	
	assembla.get(req, res, 'milestones/' + milestoneId + '.json', req.params.accessToken);


}