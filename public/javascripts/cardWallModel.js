
function login() {
	console.log('Logging in...');
};

function CardWallModel() {
	var me = this;

	me.milestone = ko.observable();
	me.statuses = ko.observableArray([
			{name: 'New', label : 'New'},
			{name: 'Blocked', label : 'Blocked'},
			{name: 'Readyforanalysis', label : 'Ready'},
			{name: 'InAnalysis', label : 'In'},
			{name: 'Readyfordev', label : 'Ready'},
			{name: 'InDev', label : 'In'},
			{name: 'Readyfortestingrelease', label : 'Ready'},
			{name: 'Readyfortest', label : 'Ready'},
			{name: 'InTest', label : 'In'},
			{name: 'Readyforacceptance', label : 'Acceptance'},
			{name: 'Done', label : 'Done'}
		]);

	me.loadTickets = function(milestoneId){
		console.log('Loading tickets for Milestone: ' + milestoneId);
	}; 

	// test data
	me.milestone({ id : 12312312312, name : 'Release 150' });
};
