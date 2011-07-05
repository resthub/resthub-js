// ## Basic jquery-ui Testsuite

require({baseUrl: "../../"}, ['lib/jqueryui/button'], function() {

	module('jquery-ui');

	test('should be good when we create some widgets say button', function() {
		var bt = $('<a />').button({label: 'fancy buttons'});
		console.log(bt);
		
		ok(bt instanceof jQuery, 'is a jQuery el');
		ok(bt.is('.ui-widget') && bt.is('.ui-button'), 'is a button widget');
	});

});