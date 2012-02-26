/**
 * Resthub-controller is a generic javascript controller for resthub
 * applications. It provides utility functions for basic operations.
 * 
 * <b>Do not remove the lib/jqueryui/widget inclusion: its needed for the destroy mechanism.</b>
 */
define(['lib/class', 'lib/jquery/jquery.tmpl', 'lib/jqueryui/widget', 'lib/console'], function(Class) {

	// A global GUID counter for objects
	var	uid = 0;

	return Class.extend("Controller", {

		// used to remove the controller from the name
		_underscoreAndRemoveController : function(className) {
			var str = className.replace("jQuery.", "").replace( /\./g, '_').replace(/_?controllers?/ig, "");
			return str.replace(/::/, '/')
				.replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
				.replace(/([a-z\d])([A-Z])/g, '$1_$2')
				.replace(/([a-z\d])([A-Z])/g, '_')
				.toLowerCase();
		},

		init : function() {
			// if you didn't provide a name, or are controller,
			// don't do anything
			if (!this.shortName || this.fullName == "jQuery.Controller") {
				return;
			}
			
			// cache the underscored names
			this._fullName = this._underscoreAndRemoveController(this.fullName);
			this._shortName = this._underscoreAndRemoveController(this.shortName);
			var controller = this, pluginname = this.pluginName || this._fullName;

			// create jQuery plugin, if plugin name is set and non conflicting method
			if (!pluginname || $.fn[pluginname]) {
				return;
			}
			// plugin helper, creates the controller instance, binds to the dom element
			$.fn[pluginname] = function(options) {
				var args = $.makeArray(arguments);
				// if the arg is a method on this controller

				// always return the elements
				return this.each(function() {
					// create a new controller instance, and stores it in the node.
					var inst = controller.newInstance.apply(controller, [ this ].concat(args));
					$.data(this, pluginname, inst);
				});
			};
		}}, {
			
		template: '',

		/**
		 * Handle for event subscription.
		 * Automatically unsubscribed when the controller is destroyed.
		 */
		handles: [],

		setup: function( element, options ) {
			// Destroy previous DOM affected Controller
			for (var ctrl in $(element).data()) {
				if ($(element).data(ctrl) instanceof Class) {
					$(element).data(ctrl).destroy();
				}
			}
			this.element = $(element);
			
			this.handles = [];
			$.extend( true, this, options );
			
			// compile template for later use, templates are registered as tmpl.pluginname
			// compiled function are attached to controller instance as this.tmpl
			// todo: see if it's better to just replace the template property (raw string)
			// with this compiled template
			if(this.template) {
				this.tmpl = $.template('tmpl_' + ++uid, this.template);
			}
			
			// Bind to remove element to call the destroy method.
			this.element.bind('remove.'+this.Class._fullName, $.proxy(this.destroy, this));
		},

		/**
		 * Subscribe an method of this controller (or an anonymous function)
		 * to an event, keeping the returned handle for automatic removal
		 * during destroy.
		 * If eventType is an array, the handler is bound to all events.
		 * 
		 * @param eventType Type of event subscribed. Can be an array.
		 * @param callback anonymous function executed in this controller 
		 * context, or name of an existing method (name is string).
		 */
		subscribe: function(eventType, callback) {
			var bound;
			if (jQuery.isFunction(callback)) {
				bound = $.proxy(callback, this);
			} else {
				bound = $.proxy(this, callback);
			}
			if (!jQuery.isArray(eventType)) {
				eventType = [eventType];
			}
			for (var i = 0; i < eventType.length; i++) {
				// Register the callback and kept the handle.
				this.handles.push($.subscribe(eventType[i], bound));
			}
		}, // subscribe().

		/**
		 * Destroy function, invoked when the rendering is removed.
		 * May be overrited to add specific finalization code.
		 * 
		 * <b>Don't forget to call this._super() in overriden methods.</b>
		 * Unsubribe all event handles stored in this.handles.
		 */
		destroy: function() {
			// Unsubscribed known handles
			for (var i = 0; this.handles && i < this.handles.length; i++) {
				$.unsubscribe(this.handles[i]);
			}
			// Unbind the removal event.
			this.element.unbind('remove.'+this.Class._fullName);
		},

		/**
		 * Renders current widget with the template specified in this.prototype.template.
		 * 
		 * @param data Mandatory, the data to render. This can be any JavaScript type, including Array or Object.. For example an object {value : 'test'} passed as data parameter will be referenced as ${value} in the template
		 * @param options An optional map of user-defined key-value pairs. Extends the tmplItem data structure, available to the template during rendering
		 * @param el Optional, used to override the default element when the template will be rendered (by default this.element)
		 * @param template Optional, used to override the default template (by default this.tmpl)
		 */
		render : function(data, options, el, tmpl) {
			
			if(!tmpl) {
				tmpl = this.tmpl;
			}
			// if no template is defined
			if(!tmpl) {
				// no tmpl provided,
				console.warn("No template provided for this " + this.Class._fullName + " instance, so skip rendering");
				return this;
			}

			if(!el) {
				// If not element was specified, use default one
				el = this.element;
			}

			el.empty().append($.tmpl(tmpl, data, options));
			
			return this;
		}
	});
});
