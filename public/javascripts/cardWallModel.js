
function CardWallModel(token) {
	var me = this;

	me.accessToken = token;
	me.milestones = ko.observableArray();
	me.milestone = ko.observable({ id: 0, title: ''});
	me.columns = ko.observableArray();
	me.users = ko.observableArray();
	me.pointsText = ko.observable('');

	me.states = [
			{name: 'New', tickets: [] , label : 'New', points : 0},
			{name: 'Blocked', tickets: [] , label : 'Blocked', points : 0},
			{name: 'Ready for analysis', tickets: [] , label : 'Analysis Ready', points : 0},
			{name: 'In Analysis', tickets: [] , label : 'In Analysis', points : 0},
			{name: 'Ready for dev', tickets: [] , label : ' Dev Ready', points : 0},
			{name: 'In Dev', tickets: [] , label : 'In Dev', points : 0},
			{name: 'Ready for testing release', tickets: [] , label : 'Deploy Ready', points : 0},
			{name: 'Ready for test', tickets: [] , label : 'Test Ready', points : 0},
			{name: 'In Test', tickets: [] , label : 'In Test', points : 0},
			{name: 'Ready for acceptance', tickets: [] , label : 'Acceptance', points : 0},
			{name: 'Done', tickets: [] , label : 'Done', points : 0},
			{name: 'Dusted', tickets: [] , label : 'Dusted', points : 0}
		];


	$.ajaxSetup({
		cache: false,
		error: function(xhr) { 
					if(xhr.status == "401") {
						console.log('Ticket has expired');
						window.location = '/login';
					}
				}
	})


	me.userName = function(id, notFound) {
		var user = _.find(me.users(), function(user) { return user.id == id; });

		if(!user)
			user = { name : (notFound) ? notFound : "Unassigned" };

		return user.name;
	};

	me.loadUsers = function() {
		console.log('Loading Users');

		$.ajax({
				url: '/users?access_token=' + me.accessToken, 
				type: 'GET',
				dataType: 'json',
				success: function(data) {					
					me.users(data);
				}
			});
	}; 		

	me.clearTickets = function() {
		$.each(me.states, function(i, state) { state.tickets = []; points = 0 });
		me.columns(null);
	};

	me.loadTickets = function() {
		console.log('Loading tickets for Milestone: ' + me.milestone().id);
				
		$.ajax({
				url: '/tickets/milestone/' + me.milestone().id + '?access_token=' + me.accessToken, 
				type: 'GET',
				dataType: 'json',
				success: function(data) {					

					var pointsForMilestone = 0;
					$.each(data, function(i, ticket) { 

						var status = _.find(me.states, function(status) { return status.name == ticket.status; });

						if(status) {
							status.tickets.push(ticket);
							status.points += ticket.estimate;

							if(status.name === 'Done' || status.name === 'Dusted')
								pointsForMilestone += ticket.estimate;
						}
					});

					me.columns(me.states);
					me.pointsText(pointsForMilestone + ' points');

					$(".ticket").draggable({
						opacity: 0.55,
						revert: 'invalid',
						start: function() { $(this).css('z-index', '100'); },
						stop: function() { $(this).css('z-index', '0'); }
					});

					$(".user-label").draggable({
						helper: 'clone',
						revert: 'invalid',
						opacity: 0.55,
						appendTo: 'body',

					});
				}
			});
	}; 

	me.rememberMilestone = function (id) {
		$.jStorage.set("milestone", id);
	};

	me.recallMilestone = function () {
		return $.jStorage.get("milestone");
	};

	me.loadMilestones = function() {
		console.log('Loading Milestones');

		$.ajax({
				url: '/milestones?access_token=' + me.accessToken, 
				type: 'GET',
				dataType: 'json',
				success: function(data) {
					me.milestones(data);

					var milestone = me.recallMilestone();

					if(milestone)
						me.selectMilestone(milestone);
				}
			});
	};

	me.selectMilestone = function(id) {
		console.log('Milestone ' + id + ' selected.');

		var milestone = _.find(me.milestones(), function(milestone) { return milestone.id == id; });

		me.milestone(milestone);		
		me.clearTickets();
		me.loadTickets();

		me.rememberMilestone(id);
	};

	me.refresh = function() { 
		//me.tickets(me.milestone().id);
	} ;

};
