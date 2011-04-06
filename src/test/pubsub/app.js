define(['lib/route', 'lib/pubsub'], function() {
	
	$.route('#/shouldPublishTriggersAllListeners', function() {
		$('#main *').remove();
		// Given two listeners bound to an event 'myEvent'
		var l1 = {
			method:function() {
				$('#main').append('<div class="l1">l1 executed</div>');
			}
		};
		var h1 = $.subscribe('myEvent', l1.method);
		var l2 = {
			method:function() {
				$('#main').append('<div class="l2">l2 executed</div>');
			}
		};
		var h2 = $.subscribe('myEvent', l2.method);
		
		// When triggering 'myEvent'
		$.publish('myEvent');
		
		// Then both handler were called
		if ($('#main > div').length != 2) {
			alert('Failed: both listerners were not called');
		}
		$.unsubscribe(h1);
		$.unsubscribe(h2);
	});
	
	
	$.route('#/shouldPublishNotTriggersOtherListeners', function() {
		$('#main *').remove();
		// Given a listener bound to an event 'myEvent1'
		var l1 = {
			method:function() {
				$('#main').append('<div class="l1">l1 executed</div>');
			}
		};
		var h1 = $.subscribe('myEvent1', l1.method);
		// Given a listener bound to an event 'myEvent2'
		var l2 = {
			method:function() {
				$('#main').append('<div class="l2">l2 executed</div>');
			}
		};
		var h2 = $.subscribe('myEvent2', l2.method);
		
		// When triggering 'myEvent1'
		$.publish('myEvent1');
		
		// Then only listener 1 has been called
		if ($('#main > div.l1').length != 1) {
			alert('Failed: first listener not called');
		}
		if ($('#main > div').length != 1) {
			alert('Failed: all listeners were called');
		}
		$.unsubscribe(h1);
		$.unsubscribe(h2);
	});
	
	
	$.route('#/shouldPublishNotTriggersUnsubscirbedListeners', function() {
		$('#main *').remove();
		// Given two listeners bound to an event 'myEvent3'
		var l1 = {
			method:function() {
				$('#main').append('<div class="l1">l1 executed</div>');
			}
		};
		var h1 = $.subscribe('myEvent3', l1.method);
		var l2 = {
			method:function() {
				$('#main').append('<div class="l2">l2 executed</div>');
			}
		};
		var h2 = $.subscribe('myEvent3', l2.method);
		
		// Given listerner 2 unsubribed.
		$.unsubscribe(h2);
		
		// When triggering 'myEvent3'
		$.publish('myEvent3');
		
		// Then only listener 1 has been called
		if ($('#main > div.l1').length != 1) {
			alert('Failed: first listener not called');
		}
		if ($('#main > div').length != 1) {
			alert('Failed: all listeners were called');
		}
		$.unsubscribe(h1);
	});

	
	$.route('#/shouldPublishPassedData', function() {
		$('#main *').remove();
		// Given a listener bound to an event 'myEvent'
		var l = {
			method:function() {
				$('#main').append('<div class="l1">'+ Array.prototype.join.call(
						arguments, [' '])+'</div>');
			}
		};
		var h = $.subscribe('myEvent', l.method);
		
		// When triggering 'myEvent' with data
		$.publish('myEvent', ['Hello', 'World', true]);
		
		// Then only listener 1 has been called
		if ($('#main > div').length != 1) {
			alert('Failed: first listener not called');
		}
		if ($('#main > div').html() != 'Hello World true') {
			alert('Failed: data was not properly passed');
		}
		$.unsubscribe(h);
	});
	
	
	$.route('#/shouldNotLostContext', function() {
		$('#main *').remove();
		// Given a listener bound to an event 'myEvent'
		var l = {
			argument: 'Hello world',
			method:function() {
				$('#main').append('<div class="l1">'+this.argument+'</div>');
			}
		};
		var h = $.subscribe('myEvent', $.proxy(l, 'method'));
		
		// When triggering 'myEvent' with data
		$.publish('myEvent', ['Hello', 'World', true]);
		
		// Then only listener 1 has been called
		if ($('#main > div').length != 1) {
			alert('Failed: first listener not called');
		}
		if ($('#main > div').html() != 'Hello world') {
			alert('Failed: data was not properly passed');
		}
		$.unsubscribe(h);
	});
	
	
	$.route(location.hash);


});