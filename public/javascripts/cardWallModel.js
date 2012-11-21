
function CardWallModel(token) {
	var me = this;

	me.accessToken = token;
	me.milestone = ko.observable({ id: '', title : ''});
	me.columns = ko.observableArray();
	me.users = ko.observableArray();

	me.states = [
			{name: 'New', tickets: [] , label : 'New'},
			{name: 'Blocked', tickets: [] , label : 'Blocked'},
			{name: 'Ready for analysis', tickets: [] , label : 'Analysis Ready'},
			{name: 'In Analysis', tickets: [] , label : 'In Analysis'},
			{name: 'Ready for dev', tickets: [] , label : 'Ready for Dev'},
			{name: 'In Dev', tickets: [] , label : 'In Dev'},
			{name: 'Ready for testing release', tickets: [] , label : 'Ready for Test Release'},
			{name: 'Ready for test', tickets: [] , label : 'Ready for Test'},
			{name: 'In Test', tickets: [] , label : 'In Test'},
			{name: 'Ready for acceptance', tickets: [] , label : 'Acceptance'},
			{name: 'Done', tickets: [] , label : 'Done'}
		];

	me.findUser = function(id) {
		var user = _.find(me.users(), function(user) { return user.id == id; });

		if(!user)
			return { name : "Unassigned" };

		return user;
	};

	me.loadUsers = function() {
		console.log('Loading Users');

		$.ajax({
				url: '/users?access_token=' + me.accessToken, 
				type: 'GET',
				dataType: 'json',
				success: function(data) {					
					me.users(data);
				},
				error: function(xhr) { 
					if(xhr.status == "401") {
						console.log('Ticket has expired');
						window.location = '/login';
					}
				} 
			});
	}; 		

	me.loadTickets = function() {
		console.log('Loading tickets for Milestone: ' + me.milestone().id);

		$.ajax({
				url: '/tickets/milestone/' + me.milestone().id + '?access_token=' + me.accessToken, 
				type: 'GET',
				dataType: 'json',
				success: function(data) {					

					$.each(data, function(i, ticket) { 

						var status = _.find(me.states, function(status) { return status.name == ticket.status; });

						if(status)
							status.tickets.push(ticket);

					});

					me.columns(me.states);
				},
				error: function(xhr) { 
					if(xhr.status == "401") {
						console.log('Ticket has expired');
						window.location = '/login';
					}
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
				},
				error: function(xhr) { 
					if(xhr.status == "401") {
						console.log('Ticket has expired');
						window.location = '/login';
					}
				} 

			});
	};

	me.refresh = function() { 
		me.loadMilestone(me.milestone().id);
	} ;

};
