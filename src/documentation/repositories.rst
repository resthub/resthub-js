============
Repositories
============

What about connecting to a REST WebServer ? Well it's precisely Repositories purposes.

Repository is a Class that provides CRUD (Create Retrieve Update Delete) methods to handle a distant Resource, hold by a REST WebServer.

Repository defines only static methods, because these functionnalities could be accessed from every controllers in the application.
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
		 * Updates values of an existing resource (identifies by its id).
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

All ou need to do is to declare a subclass, with the root url of your REST WebServer::

	define([ 'lib/repository' ], function(Repository) {

		return Repository.extend("UserRepository", {

			root : 'api/user/',

			check : function(callback, data) {
				this._post(this.root + 'check/', callback, data);
			}

		}, {});
	});
	
In this example, we add a specific functionnality that makes an ajax call to the distant webserver.
