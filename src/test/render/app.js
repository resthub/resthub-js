/**
 * ## Basic Console Testsuite
 *
 */
require(['text!test/render/tmpl.html', 'lib/resthub'], function(tmpl) {
    
    var main = $('#qunit-fixture'),
    data = {title: 'Foobar', content: 'foobar', lang: 'en'},
    cleaner = function(res) {
        return $.trim(res.replace(/>\s+</g, '><'));
    };
    
    module('render');
    
    test('require should load text dependency', 1, function() {
        ok(tmpl, 'tmpl string and require !text ok.')
    });
    
    
    test('basic templating should be ok', function() {
        //ok(tmpl, 'tmpl string and require !text ok.');
        var output = $.tmpl(tmpl, data).html();
        equals(cleaner(output), '<h1>Foobar</h1><span><a href="en">en</a></span>', 'templating result is ok');
    });
    
    
    test('basic controller templating should be ok', function() {
        var output = $('<div />').append($.tmpl(tmpl, {title: 'Foobar', content: 'foobar', lang: 'en'})).html();
        
        // hmm, controller api... New controller means a new global...
        var TestController = Controller.extend('TestController', {
            template: tmpl
        });
            
        // init controller... and render
        main.test().data('test').render(data);
        
        equals(cleaner(main.html()), cleaner(output), 'templating result is ok');
    });
    
    test('a controller can be defined without template, the render method is then a noop.', function() {
        var output = main.html();

        // hmm, controller api... New controller means a new global...
        var TestController = Controller.extend('NotmplController', {});
        
        // init controller... and render
        main.notmpl().data('notmpl').render(data);

        equals(cleaner(main.html()), cleaner(output), 'templating result is ok');
    });
    
    
    
});

