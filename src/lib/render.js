define(['lib/jquery', 'lib/jquery/jquery.tmpl'], function () {
	
    $.fn.render = function(url, data) {
		$.get(url, function(template) {
			$.tmpl(url, data).appendTo($(this));
		});
    };
});
