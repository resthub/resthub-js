=========	
Event bus
=========

Simple event bus - allows loosely coupled software design in you application.

It's an elegant way to enable communcation between controllers without introducing strong coupling between them.

Implemented in pubsub.js.::
 
		/**
		 * Define an event handler for this eventType listening on the event bus
		 *
		 * subscribe( type, callback )
		 * @param {String} type A string that identifies your custom javaScript event type
		 * @param {function} callback(args) function to execute each time the event is triggered
		 * 
		 * @return Handle used to unsubribe.
		 */
		$.subscribe(eventType, handler(args));
	  
		/**
		 * Remove a previously-defined event handler for the matching eventType
		 * 
		 * @param {String} handle The handle returned by the $.subscribe() function
		 */
		$.unsubscribe(handle);
	  
		/**
		 * Publish an event in the event bus
		 * 
		 * @param {String} type A string that identifies your custom javaScript event type
		 * @param {Array} data  Parameters to pass along to the event handler
		 */
		$.publish(eventType, [extraParameters]);