/**
 * ## Basic ie support test suite
 */
require(['lib/resthub'], function() {

    var tmpl = '<li><a href="${url}">${name}</a></li>',
    data = [{
      name: "Resig",
      url: "http://ejohn.org/"     
    }, {
        name: 'Reed',
        url: 'http://weblogs.asp.net/infinitiesloop/',
    }, {
        name: 'Moore',
        url: "http://www.borismoore.com",
    }];

    module('ie');

    test('should be ok with basic templating', function() {
        equals($.tmpl( tmpl, data[0] ).html(), '<a href="http://ejohn.org/">Resig</a>', 'expect basic anchor markup');
        equals($.tmpl( tmpl, data ).text(), 'ResigReedMoore', 'expect enumerable to acts accordingly');
    });
    
    test('should be ok with ie8 related testing', function() {
        var tpl = "<strong>${hero}</strong>",
        model = [{hero: "Chuck Norris"}, {hero: "Steven Seagal"}];
       
        var result = $.tmpl( tpl, model ).text();
        
        equals(result, 'Chuck NorrisSteven Seagal', 'Chuck Norris does not use templates, templates use Chuck Norris');

    });

});
