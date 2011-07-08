// ## Basic JSON Testsuite

require(['lib/json'], function() {

	module('json');

	test('basic JSON.stringify test', function() {
		var o = {plugin: 'jquery-json', version: 2.2};
		equals($.toJSON(o), JSON.stringify(o), 'same as calling JSON.stringify...');
	});
	
	test('basic JSON.parse test', function() {
		var o = $.toJSON({plugin: 'jquery-json', version: 2.2});
		deepEqual($.evalJSON(o), JSON.parse(o), 'same as calling JSON.parse...');
	});


});