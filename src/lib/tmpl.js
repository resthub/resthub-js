define(['lib/jquery/jquery.tmpl'], function () {

	$.fn.render = function( url, data, options, parentItem ) {
		var element = this[0];
		$(element).empty();
		$.get(url, function(template) {
			$.tmpl(template, data, options, parentItem).appendTo(element);
		});
	};
	
});