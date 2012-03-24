==========
Controller
==========

You've got routes, script loading, OOP. Thoses are very low level tools. 
To allow you building a strong and understandable Rich Application, RESThub JS gives you a tiny MVC pattern.

A Controller is a autonomous component that will be attached to a DOM node (div, span) in order to display itself.
It is statefull, so you can create many Controller instances, they will render themselves based on there own atributes.

Template loading is based on `RequireJS text plugin <http://requirejs.org/docs/api.html#text>`_ and `jQuery tmpl <http://api.jquery.com/jquery.tmpl/>`_.

Controller definition
---------------------

Controllers are Classes, so here is an example of declaration::
	
	define([ 'text!home.html', lib/controller', 'lib/jqueryui/button' ], function(tmpl, Controller) {
	
		return Controller.extend("MyHomeController", {
		
			template : tmpl,
			myName : "I'm called HomeController",
			
			/**
			 * Constructor. Display template and creates widgets.
			 */
			init : function() {
				var data = { user: $.storage.get(Constants.USER_KEY) };
				// Calls the view rendering 
				this.render(data);
			}
		}
	});

There are 3 main points on the example :
 * The home.html html template is loaded thanks to the text plugin, and stored in the tmpl variable
 * The template is stored in the this.template attribute, and will be compiled during Controller initialization in order to be used later by the rendering process 
 * render function dynamize the home.html html template with data passed as parameter

We saw in the class paragraph that init() method acts like a constructor. So during construction, the view will be rendered.

Controller usage
----------------

To instantiate a controller, we need to require it, and then to use it as a jQuery plugin::

		$.route('#/home', function() {
			require(['myhome'], function() {
				$('#myDiv').my_home();
			});
		});
		
The name of the jQuery plugin is the name of your controller, without the 'Controller' part, all in lowercase, with _ separating words : 
 * MyHomeController -> $('#myDiv').my_home();
 * HomeController -> $('#myDiv').home();

Select an existing DOM node (the one with id 'myDiv' in the example), and apply the desired controller on it.

The render method
-----------------

The render method will display the current Controller based on the template and the data passed as parameters::

	/**
	 * Renders current widget with the template specified in this.prototype.template.
	 * 
	 * @param data Mandatory, the data to render. This can be any JavaScript type, including Array or Object.. For example an object {value : 'test'} passed as data arameter will be referenced as ${value} in the template
	 * @param options Optional map of user-defined key-value pairs. Extends the tmplItem data structure, available to the template during rendering
	 * @param el Optional, used to override the default element when the template will be rendered (by default this.element)
	 * @param tmpl Optional, used to override the default template (by default this.tmpl)
	 */
	render : function(data, options, el, tmpl);

Add template interaction
------------------------

Now we want to add some interactivity: let's plug a jQuery-UI button widget::

	init : function() {
		// Calls the view rendering 
		this.render();
		
		// Adds some widget
		$('a', this.element)
			.click($.proxy(this, '_buttonHandler'))
			.button({
				label: 'ClickMe'
			})
					
By itself the button does not handle clicks (its a business-agnostic widget).
So we bound a handler method to the click event of the DOM Node.

As you probably know, Javascript loses the 'context' (pointed by the ``this`` keyword) when asynchronous event occurs.

So when the user will click, the handler will not be related to your Controller !

Fortunately, the jQuery $.proxy() method corrects this issue. 

And we could use the Controller's inner attribute in the handler::
			
	/**
	 * Handler of user click. Writes a console message.
	 *
	 * @param {Event} event Click event
	 */
	_buttonHandler: function(event) {
		// Stops event propagation
		event.preventDefault();
		console.info('You clicked me: ' + this._myName);
		return false;
	}
			
The destroy method
------------------		
	
What about memory management ?

As we bound a handler to the click event, we need to unbind this before the Controller deletion.
Or we may create memory leaks.

That's the purpose of the destroy() method::
			
	/**
	 * Destroy function, invoked when the rendering is removed.
	 * May be overrited to add specific finalization code.
	 */
	destroy: function() {
		// Unbind connected handlers
		$('a', this.element).unbind();
		// Calls overriden method
		this._super();
	}

*Be careful ! You absolutely need to call the overriden method when overriding the destroy() method*.

Event subscription
------------------

In complex RIA, Controllers massively use event (the pub-sub mechanism). 
To lighten usage of event handles, Controllers have a specific subscribe() method::

	init : function() {
		// Calls the view rendering 
		this.render();
		
		this.subscribe(['event1', 'event2'], '_eventHandler');
		
The controller's subscribe() method will automatically holds the generated handle, and performs automatically unsubscription in the destroy() method.

You can quickly register a single handler to multiple events.

And in bonus, you do not need to use $.proxy(), because it's internally used.