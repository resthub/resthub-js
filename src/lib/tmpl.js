define(['lib/jquery', 'lib/jquery/jquery.tmpl', 'lib/innershiv'], function () {

	$.fn.render = function( url, data, options, parentItem ) {
		var element = this[0];
		$(element).empty();
		// Synchronous get to block caller until the template is rendered.
		$.ajax({
			url: url,
			async: false,
			success: function(template) {
				var tmpl = null;
				if (typeof window.Modernizr != 'undefined') {
					tmpl = $.tmpl('<div>' + template + '</div>', data, options, parentItem);
					$(element).append(innerShiv(tmpl, true));
				} else {
					$.tmpl(template, data, options, parentItem).appendTo(element);
				}
			}
		});
	};
	
});