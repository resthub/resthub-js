define(['lib/jquery', 'lib/jquery/jquery.tmpl', 'lib/innershiv'], function () {

	// mdl: todo, not sure this plugin helper is really needed...
	// Can't controller handle the rendering? They have a render method devs should use.
	$.fn.render = function( data, options ) {
		
		options = options || {};
		
		// don't act on absent element
		if(!this.length) return;
		
		return this.each(function() {
			var el = $(this);
			// from the dom element, try to get a reference to any attached controller
			// ou pas
			
			// todo: no easy way to get associated controller other than iterating
			// through el.data(), check if it's an instanceof Controller
			// get its template, perform the rendering (or just call render method)
			
			// feels heavy, for really no gain.
			$.each(el.data(), function(i, prop) {
				if(prop instanceof Controller) {
					prop.render(data);
				}
			});
			
		});
	};
	
});