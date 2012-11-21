

exports.index = function(req, res) {

	var assembla = require('../assembla');

	console.log('Requesting users');
	
	assembla.get(req, res, 'users.json');

};