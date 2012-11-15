
function login() {
	console.log('Logging in...');
};

function CardWallModel(token) {
	var me = this;

	me.accessToken = token;
	me.milestone = ko.observable({ id: '', name : ''});
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
		me.milestone({ id : milestoneId, name : milestoneId });

	$.ajax({
			url: '/tickets?milestone_id=' + milestoneId + '&access_token=' + me.accessToken, 
			type: 'GET',
			dataType: 'json',
			success: function(data) {
				me.tickets(data);

				var div = $("#temp");
				$.each(data, function(i, t) { div.append($("<span/>").text(t.summary)); });
			}
		});

	}; 

};
