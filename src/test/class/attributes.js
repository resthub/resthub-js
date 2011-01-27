define(['lib/class'], function(Class) {
	
	
	var Animal = Class.extend({
		name: 'animal',
		color: 'grey',
		init: function() {
			this.name = 'animal'
		}
	});
	

	$('#attributes').click(function() {
		var ted = new Animal();
		var output = '<br/>ted: ' + ted.color + ' ' + ted.name;
		var john = new Animal();
		output += '<br/>john: ' + john.color + ' ' + john.name;

		Animal.prototype.color = 'red'
		Animal.prototype.name = 'shark'
		var harry = new Animal();
		output += '<br/>harry (Animal.prototyp changed): ' + harry.color + ' ' + harry.name;
		
		$('#main').html('Name is initialized in init(), color not.'+output);
		
	});

});