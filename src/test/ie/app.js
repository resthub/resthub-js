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

        // $.fn.render do not return itself, no chaining sugar...
        // also it works synchronously...
        var el = $('ul');

        // deal with different basePath (running test from src/test or src/test/ie?)
        // really have to change the way templates view are retrived to use requirejs !text plugin
        el.render((/ie/.test(location.pathname) ? '' : 'ie/') + 'tmpl.fixture.html', data);

        equals($.trim(el.text()), 'Remote:Resig Remote:Reed Remote:Moore', 'using remote should be ok');
    });
    
    test('should be ok with ie8 related testing', function() {
        var tpl = "<strong>${hero}</strong>",
        model = [{hero: "Chuck Norris"}, {hero: "Steven Seagal"}];
       
        result = $.tmpl( tpl, model ).text();
        
        equals(result, 'Chuck NorrisSteven Seagal', 'Chuck Norris does not use templates, templates use Chuck Norris');

    });

});
