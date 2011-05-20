=======
Routing
=======

Define or run a route depending parameters. 
A route is defined by a location hash, that will trigger the handler passed in parameter.

On recent browser, the hashchange event is used. 
On other browser, a timer check if location.hash has changed or not in order to determine what route should be runned.

Implemented in routes.js.::

	/**
	 * Define a route with the matching callback
	 * @param {String} path A location hash (also named URL fragment) that identify the route, for
	 *				   example #/ or #/route1. You can define some parameters that will be available
	 *				   in the handler by user routes like #/user/:id for example
	 * @param {Function} handler(params) A function to execute when the route is runned. If the path
	 *					 contains some params like :id or :name, they will be available in the
	 *					 handler with params.id or params.name
	 **/
	$.route(path, handler(params) );
	
	/**
	 * Run a route
	 * When a route is runned, the 'route-run' event is dispatched (could be catched thanks to $.subscribe())
	 * @param {String} path The path that identitfy the route to run
	 **/
	 $.route(path);
	
Examples::

	/** Define a route with the matching callback **/
	$.route('#/route1', function() {
		console.log('Run route 1');
	});
	
	/** Define a route with a path parameter **/
	$.route('#/route2/:id', function(params) {
		console.log('Run route 2 with parameter id = ' + params.id);
	});
	
	/** Run a route **/ 
	$.route('#/route1');
	
	/** Trigger the route for current location **/
	$.route(location.hash);
