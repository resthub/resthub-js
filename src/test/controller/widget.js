(function() {

define(['text!test/controller/widget.html', 'lib/controller'], function(tmpl, Controller) {

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