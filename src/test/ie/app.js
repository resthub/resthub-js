define(['lib/resthub'], function() {

    // A template string
    var tmpl = '<section><a href="${url}">${lastName}</a></section>';

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

            $('.content').empty();
            $.tmpl( tmpl, dataObject ).appendTo( '#main .content' );
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

            $('.content').empty();
            $.tmpl( tmpl, people ).appendTo( '#main section.content' );

    });

    $('.remoteSimpleTemplate').click(function() {
            var dataObject = {
                    firstName: "John",
                    lastName: "Resig",
                    url: "http://ejohn.org/",
                    cities: [
                            "Boston, MA",
                            "San Francisco, CA"
                    ]
            };

            $('#main > section.content').render('./simpletemplate.html', dataObject);
    });

    $('.ie8bug').click(function() {

        var tpl = "<strong>${hero}</strong>";
        var model = [{hero: "Chuck Norris"},{hero: "Steven Seagal"}];
        var probe = $("<div>/").append($.tmpl(tpl, model));
        if ($(probe).html() == "<strong>Chuck Norris</strong><strong>Steven Seagal</strong>") {
              console.info("success");
        } else {
              console.info("failure");
        }
    });
		
});