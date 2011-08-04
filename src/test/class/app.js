// TODO: refractor this using setup/teardown
define(['lib/class'], function(Class) {
		
	module('class');
	
	var Resource = Class.extend({
	  init: function(name) {
		this.name = name;
	  }
	});

	var Project = Resource.extend({
	  init: function(name) {
		this._super( 'Ping ' + name );
	  }	  
	});

	var ProjectContainer = Project.extend({
	  init: function(name){
		this._super( 'Pong ' + name );
	  }
	});
	
	test('should behave correctly with creation', function() {
		var r1 = new Resource('r1'),
		p1 = new Project('p1'),
		pc1 = new ProjectContainer('pc1');

		equals(r1.name, 'r1', 'name is fine');		
		equals(p1.name, 'Ping p1', 'name is fine');		
		equals(pc1.name, 'Ping Pong pc1', 'name is fine');		

	});
		
	
	test('should behave correctly with class properties', function() {
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

		equals(Animal.shout(), 'GRRRRRRRRRAAAAAAA ! (Animal scream !)', 'should scream');
		equals(Mammal.shout(), 'grrrraaa ! (Weak mammal scream)', 'should scream');
		equals(Shark.shout(), "I don't scream, I eat fish");
		equals(Dolphin.shout(), "I don't scream, I eat fish (and I\'m gay !)");

		equals(Animal.move(), 'I can\'t move...');
		equals(Mammal.move(), 'I can\'t move either !');
		equals(Shark.move(), 'I swim in the sea');
		equals(Dolphin.move(), 'I swim in the sea');

	});
	
	test('should behave correctly with instance properties', function() {
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
		
		var ted = new Animal('Ted');
		var harry = new Mammal('Harry');
		var john = new Shark('John');
		var tim = new Dolphin('Tim');
		
		equals(ted.shout(), 'Ted Animal say: GRRRRRRRRRAAAAAAA ! (Animal scream !)', 'should scream');
		equals(harry.shout(), 'Harry Mammal Animal say: grrrraaa ! (Weak mammal scream)', 'should scream');
		equals(john.shout(), "Shark don't scream, they just eat fish");
		equals(tim.shout(), "Shark don\'t scream, they just eat fish (Dolphins are just gay sharks)");

	});
	

});
