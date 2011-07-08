define(['lib/controller'], function(Controller) {
	return Controller.extend("WidgetController", {
			
		destroy: function() {
			console.debug('Controller removed');
			CONTROLLER_TEST_REMOVED = true;
			this._super();
		},
		
		eventHandler: function() {
			CONTROLLER_TEST_EVENT_TRIGGERED = true;
		},
		
		init: function() {
			this.template = /controller/.test(location.pathname) ? 'widget.html' : 'controller/widget.html';
			this.render({user:{login:'hsimpson', username:'Homer Simpson'}});
			this.subscribe('myEvent', 'eventHandler');
		}
	});
});
