============
Introduction
============

RESThub JS is a Javascript micro framework, built on top of jQuery, intended to give you the usual functionalities needed
to build large applications that scale well.

It is freely inspired and based on great Javascript code/plugins found in Open Source projects, specifically :
 * Sammy.JS : RESThub route and storage plugins are directly inspired from Sammy ones. Sammy is too much for our needs and not really MVC oriented, but is a great source of inspiration.
 * Javascript MVC : too big and complex for our needs, but our class implementation came from JavascriptMVC, and our controller is inspired from theirs too.

You can test RESThub JS functionalities in your browser by going to the `RESThub JS test page <http://resthub.org/javascript/test/>`_. Source code of these tests is available from RESThub JS GitHub repository. You can run them with mvn jetty:run and go to `http://localhost:8080/test/ <http://localhost:8080/test/>`_ URL (http:// mode, mostly useful with Chrome that has difficulties with file:// mode)

Check these sample applications to learn how to design your RESThub based web application :

* `Roundtable <https://github.com/pullrequest/resthub/tree/master/resthub-apps/roundtable/>`_ : a doodle like clone.
* `Booking JS <https://github.com/pullrequest/resthub/tree/master/resthub-apps/booking/booking-js/>`_ : booking demo application, implemented with Javascript stack

If you want te efficiently debug your Javascript application :
 * Download and install `Mozilla Firefox <http://www.mozilla-europe.org/fr/>`_
 * Download and install `Firebug <https://addons.mozilla.org/fr/firefox/addon/firebug/>`_
 * Type F12 to activate Firebug console, then go to Network tab, click on the little arrow and click on "Deactivate Firefox cache"
 * Go to your application URL, for example `http://localhost:8080/ <http://localhost:8080/>`_
 * On the Script tab, you can set breakpoints in your Javascript code
 * Network and Console tabs will help you during development process 
 
