define(["lib/route"], function() {

	$(document).ready(function(){
		
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
			if ($(location).attr('hash') !== 'login') {
				throw new Error('Window\'s hash was not changed !');
			}
		});
		
		// Listen to the run-route event on the event bus
		$.subscribe('route-run', function(path) {
			console.debug("route-run event for route " + path);
		});
		

		// Run current route
		$.route(location.hash);
				
	});

});
