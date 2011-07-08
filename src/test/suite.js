
// ## RESTHub test suite

// edit the tests array to add a new suite to this one. beware of require basePath,
// you'll need to define/require from the resthub/js/src path.

(function($, exports) {

	var tests = [
	    'test/bindable/app',
		'test/class/app',
		'test/console/app',
		'test/controller/app',
		'test/i18n/app',
		'test/ie/app',
		'test/jqueryui/app',
		'test/json/app',
		'test/logger/app',
		'test/pubsub/app',
		'test/routejs/app',
		'test/sprintf/app',
		'test/storage/app',
	];
			
	
	require({baseUrl: "../"}, tests);
		
})(this.jQuery, this);