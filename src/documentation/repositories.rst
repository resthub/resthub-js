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

All we need to do is to declare a subclass, with the root url of your REST WebServer::

	define([ 'lib/repository' ], function(Repository) {

		return Repository.extend("UserRepository", {

			root : 'api/user/',

			check : function(callback, data) {
				this._post(this.root + 'check/', callback, data);
			}

		}, {});
	});
	
In this example, we add a specific functionality that makes an ajax call to the distant webserver.

You can easily create mock repositories by returning JSON files on the client side (mostly for read and list functions).
