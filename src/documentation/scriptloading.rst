==============
Script loading
==============

Script loading with RequireJS allows you to benefit the same functionnality as import in the Java language.
It allows you to define properly dependencies between scripts, and offers an easy way to load them lazily at runtime.

Quickstart
----------

Example when you have :
 * index.html Your application HTML main file
 * app.js Your application JS main file
 * routes.js JS files where are defined your routes
 * home.js Your home controller
 * lib/ RESThub JS framework
 
index.html::

	<script data-main="app" src="lib/jquery.js" type="text/javascript"></script>
	
app.js::

	define([ 'lib/resthub', 'routes', 'home' ], function() {
		...
	});

The function in app.js will be executed only when the lib/resthub.js, route.js and home.js scripts will have been loaded.
(Require.js automatically adds the .js extension).
No order is defined between dependencies, but it could be the case.

Re-use returned objects
-----------------------

If you need to use dependencies' returns in your function, just add arguments :

home.js::

	define([ 'lib/resthub', 'lib/controller', ], function(resthub, Controller) {
	
		return Controller.extend('HomeController', {
			...
		});
		
	});
	
The Controller argument will get the return of the lib/controller.js's inner function.

More informations
-----------------

See the `RequireJS doc <http://requirejs.org/docs/api.html>`_ for more informations.