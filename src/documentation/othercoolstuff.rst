================
Other cool stuff
================

Logging
-------

Minimal CommonJS Console (http://wiki.commonjs.org/wiki/Console) implementation, doesn't support advanced feature if not available through original console.
Defined in console.js.::

	console.debug(object);
	console.info(object);
	console.warn(object);
	console.error(object);

A filtering feature is added, to allow you filter your console traces, depending on a configuration you provide.
It globally works like log4j. Main difference is the absence of logger inheritance, and appender definitions.

Here is the configuration::
	LOGGER_CONF['myLogger1'] = 'debug';
	LOGGER_CONF['myLogger2'] = 'error';

The trace message must be formated this way::
	console.debug('[myLogger1] a first message in debug level');
	console.debug('[myLogger2] a second message in debug level');
	console.error('[myLogger2] a critical error');

Regarding the configuration, only the first and third message will appeared in the console.

Extract from the documentation.
	/**
	 * Defines the logger configuration.
	 * 
	 * This map takes logger name as key, and level as value. The logger name is found in log messages, 
	 * between brackets:
	 * 		console.info('[logger.name] My info to log');
	 * [logger.name] is searched into this map, and if found, the log level is eventually filtered.
	 * If the name is not found, or if there is no logger name, the log is displayed.
	 * 
	 * levels are (level: authorized methods)
	 * - 'all': console.debug(), console.info(), console.warn(), console.error()
	 * - 'debug': console.debug(), console.info(), console.warn(), console.error()
	 * - 'info': console.info(), console.warn(), console.error()
	 * - 'warn': console.warn(), console.error()
	 * - 'error': console.error()
	 * - 'none': no logs
	 */
	window.LOGGER_CONF = {}

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