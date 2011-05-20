==========
Controller
==========

You've got routes, script loading, OOP. Thoses are very low level tools. 
To allow you building a strong and understandable Rich Application, RESThub-js proposed you an tiny MVC pattern.

The Controller will embed presentation and tiny business logic.
It's strongly related to a Template (see afterward), a.k.a view.

Controller definition
---------------------

Controllers are Classes, so here is an exemple of declaration::
	
	define([ 'lib/controller', 'lib/jqueryui/button' ], function(Controller) {
	
		return Controller.extend("HomeController", {
		
			template : 'home.html',
			
			_myName : "I'm called HomeController",
			
			/**
			 * Constructor. Display template and creates widgets.
			 */
			init : function() {
				// Calls the view rendering 
				this.render();
			}
		}
	});

The *template* attribute gives the path of the related view. We'll discuss templating afterward.

We saw in the class paragraph that init() method acts like a constructor. So during construction, the view will be rendered.

Controller usage
----------------

To instanciate a controller, need to requires it, and to use it as a jQuery plugin::

		$.route('#/home', function() {
			require(['home'], function() {
				$('#myDiv').home();
			});
		});
		
Select an existing DOM node (the one with id 'myDiv' in the example), and apply the desired controller on it.

The name of the jQuery plugin is the name of your controller, without the 'Controller' stuff, all in lowercase, with _ separating words.

Parameters passed to the controller plugin are usable in the init() method.

Adds template interraction
--------------------------

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

As you probably know, Javascript loses the 'context' (pointed by this keyword) when asynchronous event occurs.

So when the user will click, the handler will not be related to your Controller !

Fortunately, the jQuery $.proxy() method correct this issue. 

And we could use Controller's inner attribute in the handler::
			
	/**
	 * Handler of user clic. write a console message.
	 *
	 * @param {Event} event Click event
	 */
	_buttonHandler: function(event) {
		event.preventDefault();
		// Stops event propagation
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

*Be carefull ! you absolutely need to call the overriden method when overriding the destroy() method*.

Event subscription
------------------

In complex RIA, Controllers massively used event (the pub-sub mechanism). 
To lighten useage of event handles, Controllers have a specific subscribe() method::

	init : function() {
		// Calls the view rendering 
		this.render();
		
		this.subscribe(['event1', 'event2'], '_eventHandler');
		
The controleller's subscribe() method will automatically holds the generated handle, and performs automatically unsubscription in the destroy() method.

You can quickly register a single handler to multiple events.

And in bonus, you do not need to use $.proxy(), because it's internally used.