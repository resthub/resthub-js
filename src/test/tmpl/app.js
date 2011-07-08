/**
 * ## Basic Console Testsuite
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
       
    module('tmpl');

    test('should be ok with basic templating', function(){
        equals($.tmpl( tmpl, data[0] ).html(), '<a href="http://ejohn.org/">Resig</a>', 'expect basic anchor markup');
        equals($.tmpl( tmpl, data ).text(), 'ResigReedMoore', 'expect enumerable to acts accordingly');
        
        // $.fn.render do not return itself, no chaining sugar...
        // also it works synchronously...
        var el = $('ul'),
        path = /src\/test\/tmpl/.test(location.pathname) ? 'tmpl.fixture.html' : 'tmpl/tmpl.fixture.html';
        
        el.render(path, data)
        
        equals($.trim(el.text()), 'Remote:Resig Remote:Reed Remote:Moore', 'using remote should be ok');
    });
    
});

