define(['lib/class'], function(Class) {

	var Animal = Class.extend({
		scream: 'GRRRRRRRRRAAAAAAA ! (Animal scream !)',
		shout: function() {
			return this.scream;
		},
		move: function() {
			return this.makeMove();
		},
		makeMove: function() {
			return 'I can\'t move...';
		}
	},{});
	
	var Mammal = Animal.extend({
		scream: 'grrrraaa ! (Weak mammal scream)',
		makeMove: function() {
			return 'I can\'t move either !';
		}
	},{});

	var Shark = Mammal.extend({
		shout: function() {
			return 'I don\'t scream, I eat fish';
		},
		makeMove: function() {
			return 'I swim in the sea';
		}
	},{});
	
	var Dolphin = Shark.extend({
		shout: function() {
			return this._super() + ' (and I\'m gay !)';
		}
	},{});

	$('#staticPolymorphism').click(function() {
		$('#main').html('ancestor static method. Animal: ' + Animal.shout() + 
				'<br/>ancestor static method with subclass overloaded static attribute. Mammal: ' + Mammal.shout() +
				'<br/>subclass static overloaded method. Shark: ' + Shark.shout() +
				'<br/>subclass static extended method. Dolphin: ' + Dolphin.shout() +
				'<br/><br/>static nested method. Animal: ' + Animal.move() + 
				'<br/>static nested method. Mammal: ' + Mammal.move() +
				'<br/>static nested method. Shark: ' + Shark.move() +
				'<br/>static nested method. Dolphin: ' + Dolphin.move());
	});
	
});