define(['lib/route'], function() {
	$(document).ready(function(){
		
		window.CONTROLLER_TEST_REMOVED = false;
		window.CONTROLLER_TEST_EVENT_TRIGGERED = false;
		
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
		
		$.route('#/removeController1AndPublish', function() {
			// Reset
			$('#main *').remove();
			CONTROLLER_TEST_EVENT_TRIGGERED = false;
			
			require(["test/controller/widget1"], function() {
				// Creates a controller.
				$('#main').widget1();
				$.publish('myEvent');
				if (!CONTROLLER_TEST_EVENT_TRIGGERED) {
					alert('Controller was not bound to "myEvent"');
				}
				// Removes controller
				CONTROLLER_TEST_EVENT_TRIGGERED = false;
				$('#main *').remove();
				// Publish 
				$.publish('myEvent');
				if (CONTROLLER_TEST_EVENT_TRIGGERED) {
					alert('Controller may have been unbound from "myEvent"');
				}
			})
		});
					
		$.route('#/shouldRenderNotTriggerDestroy', function() {
			// Given an empty page
			$('#main *').remove();
			CONTROLLER_TEST_REMOVED = false;
			
			require(["test/controller/widget1"], function() {
				// Given a controller
				$('#main').widget1();
				// When rendering it a second time
				$('#main').data('widget1').render({user:{login:'hsimpson', username:'Homer Simpson'}});
				// Then the destroy method was not called
				if (CONTROLLER_TEST_REMOVED) {
					alert('Destroy method must bot be called when rendering');
				}
				// When destroinging the rendering
				$('#main *').remove();
				// Then the destroy method was called
				if (!CONTROLLER_TEST_REMOVED) {
					alert('Destroy method was not called');
				}
			})
		});
		
		$.route(location.hash);
	});
});
