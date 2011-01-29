RESThub JS
==========

RESThub JS is a Javascript micro framework, built on top of jQuery, intended to give you usually needed functionnalities
to build large application that scales well.

It is freely inspired and based on best Javascript code/plugins found on Open Source projects, more specifically on :
 * Sammy.JS : RESThub route and storage plugins are directly inspired from Sammy ones. Sammy is too much for our need and not really MVC oriented, but is a great source of inspiration.
 * Javascript MVC : too big and complex for our need, but our class implementation come from JavascriptMVC one, and our controller is inspired from their too.

API
===
 
Script loading
--------------

Example when you have :
 * lib/ RESThub JS framework
 * routes.js JS files where are defined your routes
 * home.js Your home controller
 * app.js Your application JS main file
 * index.html Your application HTML main file

index.html::

	<script data-main="app" src="lib/jquery.js" type="text/javascript"></script>
	
app.js::

	define([ 'lib/resthub', 'routes', 'home' ], function() {
		...
	});


Logging
-------
Minimal CommonJS Console (http://wiki.commonjs.org/wiki/Console) implementation, doesn't support advanced feature if not available through original console.
Defined in console.js.::

	console.log(object);
	console.debug(object);
	console.info(object);
	console.warn(object);
	console.error(object);
	
Routing
-------
Define or run a route depending parameters. A route is defined by a location hash, that will trigger the handler passed in parameter.
On recent browser, the hashchange event is used. On other browser, a timer check if location.hash has changed or not in order to determine what route should be runned.
Defined in routes.js.::

	/**
	 * Define a route with the matching callback
	 * @param {String} path A location hash (also named URL fragment) that identify the route, for
	 				   example #/ or #/route1. You can define some parameters that will be available
	 				   in the handler by user routes like #/user/:id for example
	 * @param {Function} handler(params) A function to execute when the route is runned. If the path
	 					 contains some params like :id or :name, they will be available in the
	 					 handler with params.id or params.name
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

Event bus
---------
Todo ...

Templating
----------
Todo ...

Repositories
------------
Todo ...

Controller
----------
Todo ...

Class
-----
Todo ...

Storage
-------
Todo ...

JSON
----
Todo ...

Test it in your browser
=======================

You can test RESThub JS functionnalities in your browser by :
 * Opening src/test/index.html (file:// mode)
 * Run mvn jetty:run and go to http://localhost:8080/test/ URL (http:// mode, mostly usefull with Chrome that has difficulties with file:// mode)
