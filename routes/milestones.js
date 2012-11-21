
exports.index = function(req, res) {
	
	var assembla = require('../assembla');

	console.log('Requesting Milestones');	
	
	assembla.get(req, res, 'milestones.json');

}