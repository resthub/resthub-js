==========
Templating
==========

Client side templating capabilities are based on `jQuery Tmpl <http://api.jquery.com/jquery.tmpl/>`_

Templates are HTML fragments. You must not provide a full HTML file, with a <html>, <header> or <body> tag.
All you need is to provide a single root element (a div for example):

.. code-block:: html

	<div>
		<table>...</table>
		<form>...</form>
		...
	</div>

jQuery tmpl is builtin with RESThub JS, for more features and syntax documentation see `Jquery Tmpl web site <http://api.jquery.com/jquery.tmpl/>`_
