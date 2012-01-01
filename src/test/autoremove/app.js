define(['lib/route', 'test/autoremove/ctrl'], function() {
	
	var main = $('#qunit-fixture');
	
	module('controller');

	test('should be ok with multiple call of a ctrl on a unique DOM object', function() {
		var ctrl;
		
		ok($.fn.ctrl, '$.fn.ctrl exists');
		
		ctrl = main.ctrl();
		equals($("#qunit-fixture > div").size(), 1, 'Control rendering is ok');
		
		$.publish('myevent');
		equals($("#qunit-fixture > div").size(), 2, 'Control rendering is ok');
		
		ctrl = main.ctrl();
		$.publish('myevent');
		equals($("#qunit-fixture > div").size(), 2, 'Control rendering is ok');

		ctrl.remove();

		ok(!ctrl.data('ctrl'), 'Controller class corecly attached to dom element');
	});

});
