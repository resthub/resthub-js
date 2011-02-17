define(['lib/jquery/jquery.sprintf'], function() {

	$('.sprintf').click(function() {
		$('#main').html($.sprintf('Hello %s %s !', 'excited', 'world'));
	});
	
	$('.printf').click(function() {
		$('#main').printf('Hello %s %s !', 'excited', 'world');
	});
});