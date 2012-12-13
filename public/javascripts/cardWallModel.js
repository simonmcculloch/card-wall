
function CardWallModel(token) {
	var me = this;

	me.accessToken = token;
	me.milestones = ko.observableArray();
	me.milestone = ko.observable({ id: 0, title: ''});
	me.columns = ko.observableArray();
	me.users = ko.observableArray();
	me.pointsText = ko.observable('');
	me.selectedUser = ko.observable();
	me.states = [];

	$.ajaxSetup({
		cache: false,
		error: function(xhr) { 
					if(xhr.status == "401") {
						console.log('Ticket has expired');
						window.location = '/login';
					}
				}
	})

	me.allTickets = function() {
		var all = [];
		
		$.each(me.states, function(i, state) {
			$.each(state.tickets, function(j, ticket) {
				all.push(ticket);
			});
		});

		return all;
	};

	me.highlightUser = function(selected) {
		var user = _.find(me.users(), function(user) { return user.id == selected.id; });

		user.selected(true);

		$.each(me.allTickets(), function(i, ticket) {
			if(ticket.assigned_to_id == user.id)
				ticket.highlight(true);
		});
	}

	me.unHighlightUser = function(selected) {
		var user = _.find(me.users(), function(user) { return user.id == selected.id; });

		user.selected(false);

		$.each(me.allTickets(), function(i, ticket) {
			ticket.highlight(false);
		});
	}

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
					$.each(data, function(i, user) { 
						user.selected = ko.observable(false); 
						user.ticketCount = ko.observable(0); 
					})
					me.users(data);
				}
			});
	}; 		

	me.loadStatuses = function() {
		console.log('Loading statuses');
		me.states = [];

		$.ajax({
				url: '/tickets/statuses?access_token=' + me.accessToken, 
				type: 'GET',
				dataType: 'json',
				success: function(data) {					

					$.each(data, function(i, status) { 
						me.states.push({ state: status.state, name: status.name, tickets: [], points : 0});
					});

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
						ticket.highlight = ko.observable(false);

						var status = _.find(me.states, function(status) { return status.name == ticket.status; });

						if(status) {
							status.tickets.push(ticket);
							status.points += ticket.estimate;

							if(status.name === 'Done' || status.name === 'Dusted')
								pointsForMilestone += ticket.estimate;

						}
					});

					$.each(me.states, function(i, state) { 
						state.tickets = _.sortBy(state.tickets, function(ticket) { return ticket.priority; });
					});

					$.each(me.users(), function(i, user) {
						$.each(me.states, function(i, state) {
							$.each(state.tickets, function(j, ticket) {
								if(ticket.assigned_to_id == user.id) {
									var count = user.ticketCount();
									count++;
									user.ticketCount(count);
								}
							});
						});
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

	me.load = function() {
		me.loadUsers();
		me.loadStatuses();
		me.loadMilestones();
	};

	me.refresh = function() { 
		//me.tickets(me.milestone().id);
	} ;

};
