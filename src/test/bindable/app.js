define(['lib/class', 'lib/console'], function(Class) {


		
	module('bindable');
	
	test('should behave correctly', 2, function() {
		// Creates a class and its object.
		var Dummy = Class.extend({}),
		obj = new Dummy(),
		main = $('#main');
		
		// Adds a bindable variable.
		$.makeBindable(obj, 'value', 'Hello World !');
		
		// Binds changes to display value into the #main div 
		$.bindAttribute(obj, 'value', function(event, newValue, oldValue) {
			console.debug('value changed from ' + oldValue + ' to ' + newValue);
			equals(newValue, 'I changed my value !', 'newVal parameter should be "I changed my value !"');
			equals(oldValue, 'Hello World !', 'newVal parameter should be "I changed my value !"');
		});
		
		
		obj.value = 'I changed my value !';
		
	});
	
});