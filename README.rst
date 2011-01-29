Intro
=====

RESThub JS is a Javascript micro framework, built on top of jQuery, intended to give you usually needed functionnalities
to build large application that scales well.

It is freely inspired and based on best Javascript code/plugins found on Open Source projects, more specifically on :
 * Sammy.JS : RESThub route and storage plugins are directly inspired from Sammy ones. Sammy is too much for our need and not really MVC oriented, but is a great source of inspiration.
 * Javascript MVC : too big and complex for our need, but our class implementation come from JavascriptMVC one, and our controller is inspired from their too.

API
===
 
Script loading
--------------
Todo ...

Logging
-------
Todo ...

Routes
------

Define or run a route depending parameters. A route is defined by a location hash, that will trigger the callback passed in parameter

On recent browser, the hashchange event is used. On other browser, a timer check if location.hash has changed or not in order to determine what route should be runned

Define a route with the matching callback::

	$.route('#/route1', function() {
		console.log('Run route 1');
	});

Define a route with parameter::

	$.route('#/route2/:id', function(params) {
		console.log('Run route 2 with parameter id = ' + params.id);
	});


Run a route. When a route is runned, the route-run event is dispatched (could be catched thanks to $.subscribe())::
	
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
