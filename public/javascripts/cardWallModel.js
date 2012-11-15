
function login() {
	console.log('Logging in...');
};

function CardWallModel(token) {
	var me = this;

	me.accessToken = token;
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
	me.tickets = ko.observableArray([]);


	me.loadTickets = function(milestoneId){
		console.log('Loading tickets for Milestone: ' + milestoneId);

		$.ajax({
			url: 'https://www.assembla.com/v1/spaces/brightpt/tickets/milestone/' + milestoneId + '.json', 
			type: 'GET',
			dataType: 'json',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('authorization', 'Bearer ' + me.accessToken); 
			},
			success: function(data) {
				me.tickets(data);
			}
		});
	}; 

};
