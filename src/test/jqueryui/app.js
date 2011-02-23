define(['lib/jqueryui/button'], function() {
	
	$(document).ready(function() {		
		$('.createButton').click(function() {
			$('#main').empty();
			$('#main').append('<a href="" id="myButton"></a>');
			$('#myButton').button({
					label:'Click me'
				}).click(function(){
					alert('You clicked me !');
					return false;
				});
		});
	});
});