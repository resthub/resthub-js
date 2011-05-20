====================
Internationalization
====================

You should never use directly labels or texts in your source files. All labels may be externalized to prepare your app's
Internationalization.
Doing such thing is pretty simple with RESThub-js because of requireJS.

i18n primer
-----------

All is explained in details `here
<http://requirejs.org/docs/api.html#i18n>`_.  but the principal is :

\1. Have a label file (for example labels.js)::

    define({
        // root is mandatory.
        'root': {
                'titles': {
	        	'login': 'Connexion'
	        }
	    }
	});
	
\2. Put in a folder (nls is a standardized name for labels folders), eventually in a locale named subfolder (nls/en-US, nls/fr)... 

You always keep the same file name, and file at the root will be used by default.

\3. Add a dependency in the js file you'll need labels. 
You'll absolutely need to attribute a scoped variable to the result (in the example i18n, but you can choose the one you want). 

Prepending 'i18n!' before the file path in the dependency indicates to RequireJS that it as to get the file related to the current locale.::

	define(['i18n!nls/labels'], function(i18n) {

\4. use your labels::

	$('#main').html(i18n.titles.login); // Displays 'Connexion' in the markup with id 'main'

\5. change the locale in the require js configuration `options <http://requirejs.org/docs/api.html#config>`_

Replacement in labels
---------------------

You can use the $.sprintf() jquery function to have some replacement in your labels.
For example, with label::

	i18n.texts.welcome = 'Welcome %s !';

You can have replacement this way::

	$('#main').html($.sprintf(i18n.texts.welcome, 'Homer')); // Displays 'Welcome Homer !' in the markup with id 'main'

Just do not forget to include 'lib/jquery/jquery.sprintf' in your dependencies.

`sprintf Plugin documentation <http://plugins.jquery.com/project/psprintf>`_

Labels in templates
-------------------

Template will necesserly contains labels. 
The preferedw way of passing labels to a template is during its rendering::

			this.render({i18n:i18n, user:this.user});	

And used in the template:

.. code-block:: html

	<div class="home">
		<h1>${$.sprintf(i18n.texts.welcome, user.firstName, user.lastName)}</h1>
		
		<form id="passwordChange">
			<h2>${i18n.labels.editPassword}</h2>

You'll noticed that the $.sprintf() method is useable also in templates.
