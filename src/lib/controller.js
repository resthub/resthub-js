/**
 * Resthub-controller is a generic javascript controller for resthub
 * applications. It provides utility functions for basic operations.
 * 
 * <b>Do not remove the lib/jqueryui/widget inclusion: its needed for the destroy mechanism.</b>
 */
define(['lib/class', 'lib/tmpl', 'lib/jqueryui/widget'], function(Class) {

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
					

					// compile template for later use, templates are registered as tmpl.pluginname
					// compiled function are attached to controller instance as this.tmpl
					// todo: see if it's better to just replace the template property (raw string)
					// with this compiled template
					if(inst.template) {
						inst.tmpl = $.template('tmpl' + pluginname, inst.template);
					}

					$.data(this, pluginname, inst);
				});
			};
		}

		}, {
			
			template: '',
			
			/**
			 * Handle for event subscription.
			 * Automatically unsubscribed when the controller is destroyed.
			 */
			handles: [],
			
			setup: function( element, options ) {
				console.log('setup this > ', this);
				this.element = $(element);
				this.handles = [];
				$.extend( true, this, options );
				// Bind to remove element to call the destroy method.
				if (this.element.children().length > 0) {
					$(this.element.children()[0]).bind('remove.'+this.Class._fullName, $.proxy(this, 'destroy'));
				}
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
				if (this.element.children().length > 0) {
					$(this.element.children()[0]).unbind('remove.'+this.Class._fullName);
				}
			},
			
			/**
			 * Renders current widget with the template specified in
			 * this.prototype.template.
			 */
			render : function(data, options) {
				// if none is specified
				
				if(!this.tmpl) {
					// no tmpl provided, fallback silently
					return this;
				}
				
				return this.element.empty()
					.append($.tmpl((this.tmpl), data));
			}
		});

});
