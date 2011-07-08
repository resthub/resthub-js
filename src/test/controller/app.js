define(['lib/route', 'test/controller/widget'], function() {
	
	
	
	module('controller');

	test('should be ok with basic controller init', function() {
		var expected = '<div><h1>qsdf</h1><div class="user"><div>Login = hsimpson</div><div>Username = Homer Simpson</div></div></div>', html;
		// #main is in fixture page part
		
		ok($.fn.widget, '$.fn.widget exists');

		html = $("#main").widget().html()
			// clean up empty space
			.replace(/>\s+</g, '><');
		
		equals(html, expected, 'Control rendering is ok');
	});
	
	
	test('should be ok with controller remove', function() {
		var widget = $("#main").widget();
		
		ok(widget instanceof jQuery, 'Widgets are valid jQuery instance');
		ok(widget.data('widget'), 'Controller class corecly attached to dom element');
		
		widget.remove();
		
		ok(!widget.data('widget'), 'Controller class corecly attached to dom element');
	});

});
