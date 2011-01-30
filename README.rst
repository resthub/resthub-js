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

Namespaces
∼∼∼∼∼∼∼∼∼∼
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


Test it in your browser
=======================

You can test RESThub JS functionnalities in your browser by :
 * Opening src/test/index.html (file:// mode)
 * Run mvn jetty:run and go to http://localhost:8080/test/ URL (http:// mode, mostly usefull with Chrome that has difficulties with file:// mode)
