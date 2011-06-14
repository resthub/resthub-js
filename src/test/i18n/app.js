define(['lib/resthub', 'i18n!test/i18n/nls/labels'], function(ctrl, i18n) {

	$(document).ready(function() {
		$.tmpl('<strong>${i18n.hello.world}</strong>', {i18n: i18n}).appendTo('#main');
	});
});