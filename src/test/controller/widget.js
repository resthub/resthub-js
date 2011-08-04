(function() {

// due to two possible test location
var file = /controller/.test(location.pathname) ? 'widget.html' : 'test/controller/widget.html';

define(['text!' + file, 'lib/controller'], function(tmpl, Controller) {

	return Controller.extend("WidgetController", {

		template: tmpl,

		destroy: function() {
			console.debug('Controller removed');
			this._super();
		},

		init: function() {
			this.render({user:{login:'hsimpson', username:'Homer Simpson'}});
		}
	});
});


})();