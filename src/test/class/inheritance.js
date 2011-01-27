define(['lib/class'], function(Class) {

	var Animal = Class.extend({
		scream: 'GRRRRRRRRRAAAAAAA ! (Animal scream !)',
		init: function(name) {
			this.name = name + ' Animal';
		},
		shout: function() {
			return this.name + ' say: ' + this.scream;
		}
	});
	
	var Mammal = Animal.extend({
		scream: 'grrrraaa ! (Weak mammal scream)',
		init: function(name) {
			this._super(name + ' Mammal');
		}
	});

	var Shark = Mammal.extend({
		init: function(name){
			this._super(name + ' Shark');
		},
		shout: function() {
			return 'Shark don\'t scream, they just eat fish';
		}
	});
	
	var Dolphin = Shark.extend({
		init: function(name){
			this._super(name + ' Dolphin');
		},
		shout: function() {
			return this._super() + ' (Dolphins are just gay sharks)';
		}
	});

	$('#instancePolymorphism').click(function() {
		var ted = new Animal('Ted');
		var harry = new Mammal('Harry');
		var john = new Shark('John');
		var tim = new Dolphin('Tim');
		$('#main').html('ancestor method. Animal: ' + ted.shout() + 
				'<br/>ancestor method with subclass overloaded attribute. Mammal: ' + harry.shout() +
				'<br/>subclass overloaded method. Shark: ' + john.shout() +
				'<br/>subclass extended method. Dolphin: ' + tim.shout());
	});
	
});