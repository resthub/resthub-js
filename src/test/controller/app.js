define(["lib/route"], function(p1) {
	$(document).ready(function(){
		$.route('#',  function() {
			$('#main').html("Home");
		});
		
		$.route('#/controller1', function() {
			require(["test/controller/widget1"], function() {
				$('#main').widget1();
			});
		});

		$.route(location.hash);
	});
});