==========
Templating
==========

We'll see what we can do with those templates.
Client side templating capabilities are based on `jQuery Tmpl <http://api.jquery.com/jquery.tmpl/>`_

Templates are HTML fragments. You must not provide a full HTML file, with a <html>, <header> or <body> tag.
All you need is to provide a single root element (a div for example):

.. code-block:: html

	<div>
		<table>...</table>
		<form>...</form>
		...
	</div>


The Controller's render function is defined as follow::

	/**
	 * Renders current widget with the template specified in
	 * this.options.template. If none is defined, it uses a
	 * view with the same name as the controller
	 *
	 * @param data datas used into the template
	 * @param options fields or anonymous methods passed to the template (see JQuery Tmpl docs)
	 */
	render : function(data, options);

This is an example using data and options parameters::

	this.render({name:'bat'}); {

And into the template

.. code-block:: html

	<p>Who is ${name} ?</p>

A question remains: Where in the DOM is my template rendered ?
In the controller's *element*. As controllers are jQuery plugins, they apply to a DOM node.
The content of this DOM node will be replaced by the template.

That means that you can have simultaneously multiple controllers/views rendered at the same time.

In addition you can use template fragments into the Controller::

	// template fragment
	var tmpl = '<li><a href="${url}">${name}</a></li>';
	// clear target element
	$('#main').empty();
	// fill target element with result
	$.tmpl(tmpl, {name:'Batman',url:'about:blank'}).appendTo('#main');

For more features and syntax documentation see `Jquery Tmpl web site <http://api.jquery.com/jquery.tmpl/>`_
