/**
 * ## Basic sprintf Testsuite
 */
require(['lib/jquery/jquery.sprintf'], function() {

    module('printf');
    

    test('basic printf should be ok', function() {
        equals($.sprintf('Hello %s %s !', 'excited', 'world'), 'Hello excited world !');
        equals($.sprintf('Hello %s %s !', 'excited', 'world'), 'Hello excited world !');
    });
        
});

