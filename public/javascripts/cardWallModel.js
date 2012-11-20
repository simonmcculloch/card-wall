
function login() {
	console.log('Logging in...');
};

function CardWallModel(token) {
	var me = this;

	me.accessToken = token;
	me.milestone = ko.observable({ id: '', title : ''});
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

	me.loadTickets = function() {
		console.log('Loading tickets for Milestone: ' + me.milestone().id);

		$.ajax({
				url: '/tickets/milestone/' + me.milestone().id + '?access_token=' + me.accessToken, 
				type: 'GET',
				dataType: 'json',
				success: function(data) {
					me.tickets(data);

					var div = $("#temp");
					$.each(data, function(i, t) { div.append($("<span/>").text(t.summary)); });
				}
			});
	}; 

	me.loadMilestone = function(milestoneId) {
		console.log('Loading Milestone: ' + milestoneId);

		$.ajax({
				url: '/milestones/' + milestoneId + '?access_token=' + me.accessToken, 
				type: 'GET',
				dataType: 'json',
				success: function(data) {
					me.milestone({ id: data.id, title : data.title });

					me.loadTickets();
				}
			});
	}; 
	

};
