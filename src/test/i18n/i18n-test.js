/**
 * ## Basic ie support test suite
 */
require({baseUrl: "../../"}, ['i18n!test/i18n/nls/labels'], function(i18n) {

	console.log(arguments);
	module('i18n');

	test('should i18n works properly', 1, function() {
		console.log(i18n);
		equals(i18n.hello.world, 'Bonjour le monde!', '...')
	});
	

});

