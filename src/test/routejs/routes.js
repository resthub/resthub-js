// ## Basic Router Testsuite
 
require({baseUrl: "../../"}, ['lib/resthub'], function() {

    var tests = [
        '# Root',
        '#/login Login',
        '#/login/ Login with ending slash',
        '#/logout Logout',
        '#/wrong Wrong route',
        '#/link/23 Link with parameter id',
        '#/link/test-123 Link with parameter with the value test-123',
        '#/toto/25/tutu/50 Link with 2 parameters id and id2',
        '#/toto/search?q=bla bla bla&page=2 Link with a query string',
        '#/programmatic-route Change route programmatically',
        '#/regexp-parameters/src/main/webapp/test.js RegExp parameter 1 (at the end of url)',
        '#/regexp-parameters/src/main/webapp/test.js/edit RegExp parameters 2 (inside the url)'
    ];
        
    module('routes');

    // we expect twice as much tests to be run (subscribe to route-run) + 1
    // the +1 is needed since similar routes like `#/login` `#/login/` both match the `#/login` pattern
    // `#/login/` route will trigger both routes.
    test('should behave correctly', (tests.length * 2) + 1, function(){
        $.subscribe('route-run', function(path) {
            ok(true, 'route ' + path + ' subscribed.');
        });
        
        $.each(tests, function(i, test) {
            var fragment = test.split(' '),
            route = fragment[0],
            desc = fragment.slice(1).join(' ');
            
            // register each route with an assert
            $.route(route, function() {
                ok(true, desc);
            });
            
            // and trigger each one
            $.route(route);
        });
        
    });
    
    
});

