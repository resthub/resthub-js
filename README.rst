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

	/** Define a route with optionnal parameters (Query String) **/
	$.route('#/route3/:id?foo=bar&goo=car', function(params) {
		console.log('Run route 3 with parameter id = ' + params.id);
		console.log('and these optionnal parameters: ' + params.foo + ';' + params.goo);
	});
	
	/** Run a route **/ 
	$.route('#/route1');
	
	/** Trigger the route for current location **/
	$.route(location.hash);

Event bus
---------
Simple event bus in order to allow losely coupled software design in you application.
Implemented in pubsub.js.::
 
		/**
		 * Define an event handler for this eventType listening on th event bus
		 *
		 * @param {String} eventType A string that identify your custom javaScript event type
		 * @param {function} handler(args) function to execute each time the event is triggered, with
		 **/
		$.subscribe(eventType, handler(args));
	  
		/**
		 * Remove a previously-defined event handler for the matching eventType
		 * 
		 * @param {String} eventType A string that identify your custom javaScript event type
		 **/
		$.unsubscribe(eventType);
	  
		/**
		 * Publish an event in the event bus
		 * 
		 * @param {String} eventType A string that identify your custom javaScript event type
		 * @param {Array} extraParameters  Additional parameters to pass along to the event handler
		 **/
		$.publish(eventType, [extraParameters]);

Templating
----------
Client side templating capabilities based on jQuery Tmpl : http://api.jquery.com/jquery.tmpl/

The template file is define into the template variable of a Controler::

	define([ 'lib/controller'], function(Controller) {
		return Controller.extend("FooController", {
			template : 'path/foo.html',
			init : function() {
				this.render();
			}
		});
	});

The render function is defined as follow::

	/**
	 * Renders current widget with the template specified in
	 * this.options.template. If none is defined, it used a
	 * view with the same name of the controller
	 *
	 * @param daya datas used into the template
	 * @param options fields or anonomyous methods passed to the template (see JQuery Tmpl docs)
	 **/
	render : function(data, options);

This is an exemple using data and options parameters::

	this.render({name:'bat'}, {
		foo: function(bar) {
			return bar + "man";
		}
	});

And into the template:

	<p>Who is ${$item.foo($name)} ?</p>

In addition you can use template part into the Controller:

	// template part
	var tmpl = '<li><a href="${url}">${name}</a></li>';
	// clear target element
	$('#main').empty();
	// fill target element with result
	$.tmpl(tmpl, {name:'Batman',url:'about:blank'}).appendTo('#main');

For more features and syntax documentation see Jquery Tmpl web site: http://api.jquery.com/jquery.tmpl/

Repositories
------------
Todo ...

Controller
----------
Todo ...

Class
-----
Class provides simulated inheritance in JavaScript. Use $.Class to bridge the gap between
jQuery's functional programming style and Object Oriented Programming.
It is based off John Resig's .. _Simple Class: http://ejohn.org/blog/simple-javascript-inheritance/
Inheritance library and Javascript MVC improvements.

Besides prototypal inheritance, it includes a few important features:
 * Static inheritance
 * Introspection
 * Namespaces
 * Setup and initialization methods
 * Easy callback function creation

**Static vs. Prototype**

Before learning about Class, it's important to understand the difference between a class's static
and prototype properties.::

		//STATIC
		MyClass.staticProperty  //shared property
		
		//PROTOTYPE
		myclass = new MyClass()
		myclass.prototypeMethod() //instance method

A static (or class) property is on the Class constructor function itself and can be thought of being
shared by all instances of the Class. Prototype propertes are available only on instances of the Class.

**A Basic Class**

The following creates a Monster class with a name (for introspection), static, and prototype members.
Every time a monster instance is created, the static count is incremented.::

		$.Class.extend('Monster',
		/* @static *|
		{
			count: 0
		},
		/* @prototype *|
		{
			init: function( name ) {
				// saves name on the monster instance
				this.name = name;
				// sets the health
				this.health = 10;
				// increments count
				this.Class.count++;
			},
			eat: function( smallChildren ){
				this.health += smallChildren;
			},
			fight: function() {
				this.health -= 2;
			}
		});
		
		var hydra = new Monster('hydra');
		var dragon = new Monster('dragon');
		hydra.name        // -> hydra
		Monster.count     // -> 2
		Monster.shortName // -> 'Monster'
		hydra.eat(2);     // health = 12
		dragon.fight();   // health = 8

Notice that the prototype *init* function is called when a new instance of Monster is created.

**Inheritance**

When a class is extended, all static and prototype properties are available on the new class.
If you overwrite a function, you can call the base class's function by calling this._super.
Lets create a SeaMonster class. SeaMonsters are less efficient at eating small children, but more
powerful fighters.::

		Monster.extend("SeaMonster", {
			eat: function( smallChildren ) {
				this._super(smallChildren / 2);
			},
			fight: function() {
				this.health -= 1;
			}
		});
		
		var lockNess = new SeaMonster('Lock Ness');
		lockNess.eat(4);   //health = 12
		lockNess.fight();  //health = 11

**Static property inheritance**

You can also inherit static properties in the same way:::

		$.Class.extend("First",
		{
			staticMethod: function() { return 1;}
		},{})

		First.extend("Second", {
			staticMethod: function() { return this._super()+1;}
		},{})
		
		Second.staticMethod() // -> 2

**Namespaces**

Namespaces are a good idea! We encourage you to namespace all of your code.
 * It makes it possible to drop your code into another app without problems.
 * Making a namespaced class is easy:::
 
		$.Class.extend("MyNamespace.MyClass",{},{});
		new MyNamespace.MyClass()
		
**Introspection**

Often, it's nice to create classes whose name helps determine functionality.  Ruby on Rails's .. _ActiveRecord
ORM class: http://api.rubyonrails.org/classes/ActiveRecord/Base.html is a great example of this. Unfortunately,
JavaScript doesn't have a way of determining an object's name, so the developer must provide a name.
Class fixes this by taking a String name for the class.::

		$.Class.extend("MyOrg.MyClass",{},{})
		MyOrg.MyClass.shortName //-> 'MyClass'
		MyOrg.MyClass.fullName //->  'MyOrg.MyClass'
		
The fullName (with namespaces) and the shortName (without namespaces) are added to the Class's static properties.

**Setup and initialization methods**

Class provides static and prototype initialization functions.
These come in two flavors - setup and init.
Setup is called before init and can be used to 'normalize' init's arguments.

PRO TIP: Typically, you don't need setup methods in your classes. Use Init instead.
Reserve setup methods for when you need to do complex pre-processing of your class before init is called.::

		$.Class.extend("MyClass",
		{
			setup: function() {} //static setup
			init: function() {} //static constructor
		},
		{
			setup: function() {} //prototype setup
			init: function() {} //prototype constructor
		})


Setup functions are called before init functions.  Static setup functions are passed the base class
followed by arguments passed to the extend function. Prototype static functions are passed the Class
constructor function arguments.

If a setup function returns an array, that array will be used as the arguments for the following init method.
This provides setup functions the ability to normalize arguments passed to the init constructors.
They are also excellent places to put setup code you want to almost always run.

Init functions are called after setup functions. Typically, they receive the same arguments as their preceding
setup function. The Foo class's init method gets called in the following example:::

		$.Class.Extend("Foo", {
			init: function( arg1, arg2, arg3 ) {
				this.sum = arg1+arg2+arg3;
			}
		});
				
		var foo = new Foo(1,2,3);
		foo.sum //-> 6

**Callbacks**

Similar to jQuery's proxy method, Class provides a jQuery.Class.static.callback function that returns
a callback to a method that will always have this set to the class or instance of the class.

The following example uses this.callback to make sure this.name is available in show.::

		$.Class.extend("Todo",{
			init: function( name ) { this.name = name }
			get: function() {
				$.get("/stuff",this.callback('show'))
			},
			show: function( txt ) {
				alert(this.name+txt)
			}
		});
		
		new Todo("Trash").get();

Callback is available as a static and prototype method.

Storage
-------

Abstract various browser storage methods. Actually just localstorage is implemented, but it will shortly implement other storage mechanisms (memory, jquery data, session storage, cookie).
Implemented in storage.js.::

		/**
		 * Store an item in the local storage (Not compatible with Internet Explorer <= 7)
		 * 
		 * Publish an event 'storage-set-itemkey' (replace itemkey by you item key) and the item as eventData
		 * For example, storing user item will publish a  storage-set-user event
		 *
		 * @param {String} key Key of the stored item, this will be used to retreive it later
		 * @param {Object} item Item than will be stored in the storage, can be a string or an object
		 **/
		$.storage.set(key, item);
    	
    	/**
		 * Retreive an item from the local storage
		 *
		 * @param {String} key Key of the item to retreive
		 * @return {Object} The object retreived
		 **/
		$.storage.get(key);
        
         /**
          * Clear all items currently stored
          **/
		$.storage.clear();
        
        /**
          * Remove the specified item 
          * @param key Key of the item to remove
          **/
		$.storage.remove(key);

JSON
----

Abstract object to JSON and JSON to object conversions, in order to be able to handle this in browser when JSON.stringify() and
JSON.parse() are not implemented.
Implemented in json.js.::

		/** 
		 * Converts the given argument into a JSON respresentation.
		 * If an object has a "toJSON" function, that will be used to get the representation.
         * Non-integer/string keys are skipped in the object, as are keys that point to a function.
		 *
		 * @param {Object} object The object to convert to JSON respresentation
		 * @return {String} The JSON representation of the object passed as parameter
     	 **/
    	$.toJSON(object);
    	
		/**
		 * Evaluates a JSON representation to an object
		 * @param {String} src The object to convert to JSON respresentation
		 * @return {Object} The object evaluated
		 **/
    	$.evalJSON(src);
    	
    	/**
         * Evals JSON in a way that is *more* secure.
         *
         * @param {String} src The object to convert to JSON respresentation
		 * @return {Object} The object evaluated
    	 **/
    	$.secureEvalJSON(src);
    	
Internationalization
--------------------

You should never use directly labels or texts in your source files. All labels may be externalized to prepare your app's
Internationalization.
Doing such thing is pretty simple with RESThub-js because of requireJS.


**i18n primer**

All is explained in details `here
<http://requirejs.org/docs/api.html#i18n>`_.  but the principal is :

\1. Have a label file (for example labels.js)::

    define({
        // root is mandatory.
        'root': {
                'titles': {
	        	'login': 'Connexion'
	        }
	    }
	});
	
\2. Put in a folder (nls is a standardized name for labels folders), eventually in a locale named subfolder (nls/en-US, nls/fr)... 

You always keep the same file name, and file at the root will be used by default.

\3. Add a dependency in the js file you'll need labels. 
You'll absolutely need to attribute a scoped variable to the result (in the example i18n, but you can choose the one you want). 

Prepending 'i18n!' before the file path in the dependency indicates to RequireJS that it as to get the file related to the current locale.::

	define(['i18n!nls/labels'], function(i18n) {

\4. use your labels::

	$('#main').html(i18n.titles.login); // Displays 'Connexion' in the markup with id 'main'

\5. change the locale in the require js configuration `options
<http://requirejs.org/docs/api.html#config>`_

**Replacement in labels**

You can use the $.sprintf() jquery function to have some replacement in your labels.
For example, with label::

	i18n.texts.welcome = 'Welcome %s !';

You can have replacement this way::

	$('#main').html($.sprintf(i18n.texts.welcome, 'Homer')); // Displays 'Welcome Homer !' in the markup with id 'main'

Just do not forget to include 'lib/jquery/jquery.sprintf' in your dependencies.

`sprintf Plugin documentation
<http://plugins.jquery.com/project/psprintf>`_

**Labels in templates**

Template will necesserly contains labels. 
The preferedw way of passing labels to a template is during its rendering::

			this.render({i18n:i18n, user:this.user});	

And used in the template::

	<div class="home">
		<h1>${$.sprintf(i18n.texts.welcome, user.firstName, user.lastName)}</h1>
		
		<form id="passwordChange">
			<h2>${i18n.labels.editPassword}</h2>

You'll noticed that the $.sprintf() method is useable also in templates.

 
Test it in your browser
=======================

You can test RESThub JS functionnalities in your browser by :
 * Opening src/test/index.html (file:// mode)
 * Run mvn jetty:run and go to http://localhost:8080/test/ URL (http:// mode, mostly usefull with Chrome that has difficulties with file:// mode)
