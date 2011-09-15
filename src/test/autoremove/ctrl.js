(function() {

// due to two possible test location
var file = /autoremove/.test(location.pathname) ? 'ctrl.html' : 'test/autoremove/ctrl.html';

define(['text!' + file, 'lib/controller'], function(tmpl, Controller) {

	return Controller.extend("CtrlController", {

		template: tmpl,
		count: 0,

		destroy: function() {
			console.debug('Controller removed');
			this._super();
		},

		init: function() {
			this.subscribe('myevent', $.proxy(this, "_alterAndRefreshInstance"));
			this.render({count: this.count});
		},
		
		_alterAndRefreshInstance: function() {
			this.count++;
			this.element.append('<div>' + this.count + '</div>');
		}
	});
});


})();