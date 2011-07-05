/**
 * ## Basic Console Testsuite
 */
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
    
    
    /*
    
                // Define routes
                $.route('#', function() {
                        $('#main').html('<span>Root</span>');
                });

                $.route('#/login', function() {
                        $('#main').html('<span>Hello you</span>');
                });

                // Test multiple callbacks on the same route
                $.route('#/login', function() {
                        alert('Hello you');
                });

                $.route('#/logout', function() {
                        $('#main').html('<span>See ya !</span>');
                });

                $.route('#/link/:id', function(p) {
                        $('#main').html('Link ' + p.id);
                });

                $.route('#/toto/:id/tutu/:id2', function(p) {
                        $('#main').html('Toto ' + p.id + ', tutu ' + p.id2);
                });

                $.route('#/toto/search', function(p) {
                        $('#main').html('Link with query string: q=' + p.q + ', page=' + p.page);
                });

                $.route('#/programmatic-route', function(p) {
                        //console.debug("Return to login");
                        $.route('#/login');
                        if ($(location).attr('hash') !== '#/login') {
                                throw new Error('Window\'s hash was not changed !');
                        }
                });

                $.route('#/regexp-parameters/:regexp(.*)/edit', function(p) {
                        $('#main').html('RegExp parameter value with url fragment after: ' + p.regexp);
                });

                $.route('#/regexp-parameters/:regexp(.*)', function(p) {
                        $('#main').html('RegExp parameter value : ' + p.regexp);
                });

                // Listen to the run-route event on the event bus
                $.subscribe('route-run', function(path) {
                        console.debug("route-run event for route " + path);
                });


                // Run current route
                $.route(location.hash);
    
    
    */
});

