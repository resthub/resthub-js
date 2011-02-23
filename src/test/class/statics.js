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
		$('#main').html('ancestor static method. ' + Animal.shout() + ' (awaited: "GRRRRRRRRRAAAAAAA ! (Animal scream !)")' +
				'<br/>ancestor static method with subclass overloaded static attribute. ' + Mammal.shout() + ' (awaited: "grrrraaa ! (Weak mammal scream)")' +
				'<br/>subclass static overloaded method. ' + Shark.shout() + ' (awaited: "I don\'t scream, I eat fish")' +
				'<br/>subclass static extended method. ' + Dolphin.shout() + ' (awaited: "I don\'t scream, I eat fish (and I\'m gay !)")' +
				'<br/><br/>static nested method. ' + Animal.move() + ' (awaited: "I can\'t move...")' + 
				'<br/>static nested method. ' + Mammal.move() + ' (awaited: "I can\'t move either !")' +
				'<br/>static nested method. ' + Shark.move() + ' (awaited: "I swim in the sea")' +
				'<br/>static nested method. ' + Dolphin.move() + ' (awaited: "I swim in the sea)")');
	});
	
});