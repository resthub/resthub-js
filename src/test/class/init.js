define(['lib/class'], function(Class) {
	
	var callStack = "";
	
	var Animal = Class.extend({
		init: function() {
			callStack += 'Animal.init()<br/>';
		}
	});
	
	var Mammal = Animal.extend({
		init: function() {
			this._super();
			callStack += 'Mammal.init()<br/>';			
		}
	});

	var Shark = Mammal.extend({
		init: function(){
			this._super();
			callStack += 'Shark.init()<br/>';			
		}
	});
	
	var Dolphin = Shark.extend({
		init: function(){
			callStack += 'Dolphin.init()<br/>';			
		}
	});

	$('#initMethod').click(function() {
		callStack = '';
		new Shark('John');
		var callStack1 = callStack;
		
		callStack = '';
		new Dolphin('Ted');
		var callStack2 = callStack;
		$('#main').html('call stack for Shark:<br/>' + callStack1 + ' (awaited: "Animal.init() Mammal.init() Shark.init()")' +
				'<br/>call stack for Dolphin:<br/>' + callStack2 + ' (awaited: "Dolphin.init()")');
	});

});