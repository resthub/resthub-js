============
Repositories
============

What about connecting to a REST WebServer ? Well it's precisely Repositories' purpose.

Repository is a Class that provides CRUD (Create Retrieve Update Delete) methods to handle a distant Resource, held by a REST WebServer.

Repository defines only static methods, because these functionalities could be accessed from every controller in the application.
It provides::

		/**
		 * Creates a new resource.
		 */
		save : function(callback, data, errorCallback)
		
		/**
		 * Gets a resource from its id.
		 */
		read : function(callback, id, errorCallback)
			
		/**
		 * Updates values of an existing resource (identified by its id).
		 */
		update : function(callback, id, data, errorCallback) 
		
		/**
		 * Deletes a resource with its id.
		 */
		remove : function(callback, id, errorCallback) 
		
		/**
		 * Gets the paginated list of all existing resources.
		 */
		list: function(callback, page, size)

All we need to do is to declare a subclass, with the root url of your REST WebServer in a user.repository.js file. In this example, we extend the basic CRUD repository in order to specify the ROOT URL (api/user) and to add a specific method (check) that makes an ajax call to the distant webserver. Don't forget the last bracket pair {}, that means the the methods we add are statics, like original Repository ones ::

	define([ 'lib/repository' ], function(Repository) {

		return Repository.extend("UserRepository", {

			root : 'api/user/',

			check : function(callback, data) {
				this._post(this.root + 'check/', callback, data);
			}

		}, {});
	});


When you want to use this user repository :
	* Import the user.repository thanks to RequireJS
	* Call the static method you need, for exemple UserRepository.save($.proxy(this, '_endOfBooking'), $.toJSON(this.booking));
	* The data parameter is text, so be sure to pass $.toJSON(this.myattribute) and not directly this.myattribute
	* The callback will be called after the asynchronous request has been processed, and by default you will loose the current context. If you want to keep the current context (for exemple where this is your Controller instance), you will need to use the $.proxy(this, '_myCallback') instead of this._myCallback
	
You can easily create mock repositories by returning JSON files on the client side (mostly for read and list functions).
