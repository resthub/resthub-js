define(['lib/class'], function(Class) {

	$(document).ready(function(){
		
		// Creates a class and its object.
		Class.extend('TestClass', {});
		obj = TestClass.newInstance();
		
		// Adds a bindable variable.
		$.makeBindable(obj, 'value', 'Hello World !');
		// Binds changes to display value into the #main div 
		$.bindAttribute(obj, 'value', function() {
			console.debug('value changed !');
			$('#main').html(obj.value);
		});
		
		// Test storage handlers
		$('.changeValue').click(function() {
			obj.value = 'I changed my value !';
			var result = $('#main').html();
			if (result != obj.value) {
				throw new Error('Expected "' + obj.value + '" but was "' + result + '"');
			}
		});
		
		// First displayal
		$('#main').html(obj.value);
	});
});