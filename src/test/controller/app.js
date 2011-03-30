define(["lib/route"], function(p1) {
	$(document).ready(function(){
		
		window.CONTROLLER_TEST_REMOVED = false;
		
		$.route('#',  function() {
			$('#main').html("Home");
		});
		
		$.route('#/controller1', function() {
			require(["test/controller/widget1"], function() {
				CONTROLLER_TEST_REMOVED = false;
				$('#main').widget1();
			});
		});
		
		$.route('#/removeController1', function() {
			var controllerPresent = $('.user').length != 0;
			$('#main *').remove();
			if (controllerPresent && !CONTROLLER_TEST_REMOVED) {
				alert('Controller was not removed');
			}
		});
		
		$.route(location.hash);
	});
});
