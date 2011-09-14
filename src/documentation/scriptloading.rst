==============
Script loading
==============

Script loading with RequireJS allows you to benefit from the same functionnalities as import in the Java language.
It allows you to define properly dependencies between scripts, and offers an easy way to load them lazily at runtime.

Quickstart
----------

For example, when you have :
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

The function in app.js will be executed only when the lib/resthub.js, route.js and home.js scripts will be loaded.
(Require.js automatically adds the .js extension).
No order is defined between these dependencies, but it could be the case.

Re-use returned objects
-----------------------

If you need to use dependencies' return values in your function, just add arguments :

home.js::

	define([ 'lib/controller', 'lib/resthub' ], function( Controller ) {
	
		Controller.extend('HomeController', {
			...
		});
		
	});
	
The Controller argument will get the return of the lib/controller.js's inner function. Resthub main lib doesn't return anything, so we put it at the end of the dependency lib, and don't have to match it to any variable.

Avoid caching issues
--------------------

In order to avoid caching issues when, for example, you update your JS or HTML files, you should use the `urlArgs RequireJS attribute <http://requirejs.org/docs/api.html#config>`_. You could filter the ${buildNumber} with you build tool (Maven, Ant, Gradle) at each build.


index.html::

	<script src="lib/jquery.js" type="text/javascript" charset="utf-8" ></script>
	<script type="text/javascript">
  	require({urlArgs: "kazanversion=${buildNumber}"}, ['app']);
	</script>

After filtering::

	<script src="lib/jquery.js" type="text/javascript" charset="utf-8" ></script>
	<script type="text/javascript">
  	require({urlArgs: "kazanversion=763625256262-07082011"}, ['app']);
	</script> 

More informations
-----------------

See the `RequireJS doc <http://requirejs.org/docs/api.html>`_ for more informations.