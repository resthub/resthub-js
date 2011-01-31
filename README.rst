**RESThub JS** is a Javascript micro framework, built on top of jQuery, intended to give you usually needed
functionnalities to build large jQuery applications that scales well. It is freely inspired from best
Javascript code/plugins found on Open Source projects, more specifically on `Sammy JS <http://code.quirkey.com/sammy/>`_ (route and storage functionnality)
and `JavascriptMVC <http://www.javascriptmvc.com/>`_ (class and controller implementation).

**RESThub JS** is originally designed to work with Java `RESThub framework <http://resthub.org/>`_, but can work
with any serverside technology (Python, Ruby, PHP) that exposes REST webservices.

Examples
========

You can test RESThub JS functionnalities in your browser by running `builtin test examples <https://bitbucket.org/ilabs/resthub-js/src/tip/src/test/>`_ :
 * Opening src/test/index.html (file:// mode)
 * Run mvn jetty:run and go to http://localhost:8080/test/ URL (http:// mode, mostly usefull with Chrome that has difficulties with file:// mode)

You can also have a look to RESThub applications based on RESThub JS :
 * `Booking <https://bitbucket.org/ilabs/resthub/src/tip/resthub-apps/booking/booking-js/src/main/webapp/>`_ : a sample booking web application
 * `Roundtable <https://bitbucket.org/ilabs/resthub/src/tip/resthub-apps/roundtable/src/main/webapp/>`_ : a Doodle clone

API
===
 
Script loading + jQuery (jquery.js) 
-----------------------------------
Script loading is based on `RequireJS <http://requirejs.org/>`_, so check it for a detailed documentation.

Typically RESThub JS based application will have the following file structure :
 * lib/* : RESThub JS framework
 * routes.js : JS files where are defined your routes
 * home.js : your home controller
 * home.html : your home template
 * app.js : your application JS main file
 * index.html : your application HTML main file

index.html::

	<script data-main="app" src="lib/jquery.js" type="text/javascript"></script>
	
app.js::

	define([ 'lib/resthub', 'routes', 'home' ], function() {
		...
	});
	
Have a look to RESThub example applications like booking for more tips.

Logging (console.js)
--------------------
Minimal `CommonJS Console <http://wiki.commonjs.org/wiki/Console>`_ implementation, doesn't support advanced feature if not available through original console.::

		console.log(message);
		console.debug(message);
		console.info(message);
		console.warn(message);
		console.error(message);
	
Routing (routes.js)
-------------------
Define or run a route depending parameters. A route is defined by a location hash, that will trigger the handler passed in parameter.
On recent browser, the hashchange event is used. On other browser, a timer check if location.hash has changed or not in order to determine what route should be runned.::

	/**
	 * Define a route with the matching callback
	 * @param {String} path A location hash (also named URL fragment) that identify the route, for
	 *  example #/ or #/route1. You can define some parameters that will be available in the handler
	 *  by user routes like #/user/:id for example
	 * @param {Function} handler(params) A function to execute when the route is runned. If the path
	 *  contains some params like :id or :name, they will be available in the handler with params.id or params.name
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

Event bus (pubsub.js)
---------------------
Implements a simple event bus in order to allow low coupling in you application.::

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
	   * @param {Array} extraParameters Additional parameters to pass along to the event handler
	   **/
	  $.publish(eventType, [extraParameters]);

Templating (render.js)
----------------------
Client side templating engine, based on `EJS syntax <http://embeddedjs.com/getting_started.html>`_.::

		/**
		 * Render a template and insert the result in the element passed as parameter
		 * 
		 * @param element The jQuery element where the dynamized template will be inserted
		 * @param {String} templateUrl The relative or absolute URL of the static template will be retreived
		 * @param {Object} context Object pass as parameter to dynamize templates. It typically contains
		 *  arrays and booleans used in for loop and if tests from the template.
		 **/
		$(element).render(templateUrl, [context]); 
		
Example :

user/view.js::
		
		$('#main').render('user/view.html', { user : { login: 'admin', name: 'Administrator'} });
		
user/view.html::

		<strong>Login:</strong> <%= user.login %><br />
		<strong>Name:</strong> <%= user.name %><br />

Repositories (repository.js)
----------------------------
Repositories are used to implement data retreiving from REST webservices. Since all call to the server
is implemented in repositories, they are useful for easily mock your remote access, for testing or 
offline mode for example (not implemented yet).

Important notes :
 * Since they are stateless, they only define static vars and functions
 * Default data format is json
 * Don't forget the second pair of {} in your repository declaration, it means that vars and functions declared in
   the first one are static. Read Class JSdoc for more details
 * You may need to use $.proxy(this, 'callback') instead just callback if you use "this" object in your callback

::

	/**
	 * Base URL for Ajax call
	 **/
	Repository.root;
	
	/**
	 * Repository init function used like a constructor
	 **/
	Repository.init();
	
	/**
	 * Read an item from the server using a GET http request
	 *
	 * @param callback {Function} The callback to call when the request is completed, will have the item read as parameter
	 * @param id {String} The id of the item to read
	 **/
	Repository.read(callback, id);
	
	/**
	 * Remove an item from the server using a DELETE http request
	 *
	 * @param callback {Function} The callback to call when the request is completed
	 * @param id {String} The id of the item to remove
	 **/
	Repository.remove(callback, id);
	
	/**
	 * Save an item from the server using a POST http request
	 *
	 * @param callback {Function} The callback to call when the request is completed, will have the item saved as parameter
	 * @param data {Object} The item to save
	 **/
	Repository.save(callback, data);
	
	/**
	 * Update an item on the server using a PUT http request
	 *
	 * @param callback {Function} The callback to call when the request is completed
	 * @param id {String} The id of the item to update
	 * @param data {Object} The item to update
	 **/
	Repository.update(callback, id, data);

Usage :
::

		Repository.extend("UserRepository", {
			root : 'api/user/',
			check : function(callback, data) {
				this._post(this.root + 'check/', callback, data);
			}
		}, {});
		
		...
		
		UserRepository.save(function() { console.log('User saved'); }), { login: 'admin', name: 'Administrator'});
		UserRepository.check(function() { console.log('User checked'); }), { login: 'admin', password: '1234'})

Controller
----------
Controllers are used to make the link between :
 * The template
 * The data retreived from the server thanks to repositories
 
A controller is applyed to a jQuery element, with a name based on the the Controller classname with :
 * Underscore between words
 * De-captitalized words
 * Without Controller word
 
For example UserLoginController will be applyed to a jQuery element with $(element).user_login().
 
Controller instance variables and functions:
::
 
 	/**
	 * jQuery element where this controller will be applyed
	 **/
	element;
	
	/**
	 * Template URL
	 **/
	template;

	/**
	 * Controller init function used like a constructor
	 **/
	init();

Usage:
::

		Controller.extend("UserLoginController", {
			template: 'user/login.html',
			init : function() {
				this.render();
				var self = this;
				$('#formLogin').submit(function() {
					$.storage.remove('user');
					var user = {
						username : $('input[name="username"]').val(),
						password : $('input[name="password"]').val()
					};				
					UserRepository.check($.proxy(self, '_userLoggedIn'), $.toJSON(user));
					return false; 
				});	
			},
			_userLoggedIn : function(user) {
				$.storage.set('user', user);
				$.route('#/home');
			}
		});
		
		...
		
		$('#main').user_login();

Class (class.js)
----------------
Class provides simulated inheritance in JavaScript. Use $.Class to bridge the gap between
jQuery's functional programming style and Object Oriented Programming.
It is based off John Resig's `Simple Class <http://ejohn.org/blog/simple-javascript-inheritance/>`_
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

Storage (storage.js)
--------------------

Abstract various browser storage methods. Actually just localstorage is implemented, but it will shortly implement other storage mechanisms (memory, jquery data, session storage, cookie).::

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

JSON (json.js)
--------------

Abstract object to JSON and JSON to object conversions, in order to be able to handle this in browser when JSON.stringify() and
JSON.parse() are not implemented.::

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
