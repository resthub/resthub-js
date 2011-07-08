/**
 * ## Basic ie support test suite
 */
require({baseUrl: "../../"}, ['i18n!test/i18n/nls/labels'], function(i18n) {

	module('i18n');

	test('should i18n works properly', 1, function() {		
		equals(i18n.hello.world, 'Bonjour le monde!', '...')
	});
	

});

