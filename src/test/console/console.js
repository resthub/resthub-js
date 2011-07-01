/**
 * ## Basic Console Testsuite
 */
require({baseUrl: "../../"}, ['lib/resthub'], function() {

    module('console');

    test('should behave correctly', function(){
        
        // TODO: find a way to determine if log actually happens
        // there we just assert that these methods don't raise an error
        console.debug('JavaScript', 'does', 'not', 'sleep()');
        console.log('JavaScript', 'does', 'not', 'sleep()');
        console.info('JavaScript', 'does', 'not', 'sleep()');
        console.warn('JavaScript', 'does', 'not', 'sleep()');
        console.error('JavaScript', 'does', 'not', 'sleep()');
        
        ok(true, 'debug, log, info, warn, error usable');
    });    


});

