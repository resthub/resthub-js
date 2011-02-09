define(['lib/jquery', 'lib/jquery/jquery.tmpl'], function() {

	$(document).ready(function() {
	
		// A template string
		var tmpl = '<li><a href="${url}">${lastName}</a></li>';
			
		$('.localSimpleTemplate').click(function() {
			var dataObject = {
				firstName: "John",
				lastName: "Resig",
				url: "http://ejohn.org/",
				cities: [
					"Boston, MA",
					"San Francisco, CA"
				]
			};
			
			$('#main').empty();
			$.tmpl( tmpl, dataObject ).appendTo( '#main' );
		});
		
		$('.localEachTemplate').click(function() {
			var people = [
				{
					firstName: "John",
					lastName: "Resig",
					url: "http://ejohn.org/",
					cities: [
						{ name: "Boston", state: "MA" },
						{ name: "San Francisco", state: "CA" }
					]
				},
				{
					firstName: "Dave",
					lastName: "Reed",
					url: "http://dave.org/",
					cities: [
						{ name: "Seattle", state: "WA" },
						{ name: "Los Angeles", state: "CA" },
						{ name: "New York", state: "NY" }
					]
				},
				{
					firstName: "Boris",
					lastName: "Moore",
					url: "http://boris.org/",
					cities: [
						{ name: "Redmond", state: "WA" }
					]
				}
			];
			
			$('#main').empty();
			$.tmpl( tmpl, people ).appendTo( '#main' );

		});
		
	});
});