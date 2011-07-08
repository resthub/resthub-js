/**
 * ## Basic Console Testsuite
 */
require(['lib/route', 'lib/pubsub'], function() {
	
	var listeners = [];
	
	module('pusbub', {
		teardown: function() {
			$.each(listeners, function(i, listener) {
				$.unsubscribe(listener);
			});
			
			listeners  = [];
		},
		setup: function() {
			localStorage.clear();
		}
	});

	test('should publish triggers to all listeners', function() {
		listeners.push($.subscribe('test-event', function () {
			ok(true, 'test-event triggered twice');
		}));
		listeners.push($.subscribe('test-event', function () {
			ok(true, 'test-event triggered twice');
		}));

		// When triggering 'myEvent'
		$.publish('test-event');
		
		
	});
	
	test('should not publish to other listeners', 1, function() {
		listeners.push($.subscribe('test-event', function () {
			ok(true, 'test-event triggered twice');
		}));
		listeners.push($.subscribe('test-event-2', function () {
			ok(true, 'test-event-2 triggered twice');
		}));

		// When triggering 'myEvent1'
		$.publish('test-event');
	});
	
	
	test('should publish but prevent unsubscribed listeners', 1, function() {
		var guid = $.subscribe('test-unsuscribe', function () {
			ok(false, 'test-event-2 not triggered when unsubscribed');
		});
		
		listeners.push($.subscribe('test-unsuscribe', function () {
			ok(true, 'test-event triggered twice');
		}));
		
		// unscribe one of the two listeners
		$.unsubscribe(guid);
		
		// When triggering 'myEvent1'
		$.publish('test-unsuscribe');
		
	});
	
	
	test('should publish with data parameters', function() {		
		var data = {should: 'be', good: 'enough'},
		arr = ['should', 'be', 'good', 'enough'];
		
		listeners.push($.subscribe('test-publish-data', function(o) {
			deepEqual(o, data, 'listeners get data parameters');
		}));
		
		$.publish('test-publish-data', [data]);
		
		listeners.push($.subscribe('test-publish-data-mutliple', function() {
			var arr = Array.prototype.slice.call(arguments);			
			equals(arr.join(' '), 'should be good enough', 'listeners can get a list of parameters too.');
		}));


		$.publish('test-publish-data-mutliple', arr);
	});
	
	
	test('should not lost binding', 1, function() {
		var o = {foo: 'bar', test: function() { deepEqual(this, o, 'this is O !'); }};
		listeners.push($.subscribe('test-binding', $.proxy(o.test, o)));
		$.publish('test-binding');
	});
		
});