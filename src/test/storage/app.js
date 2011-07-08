/**
 * ## Basic Console Testsuite
 */
require(['lib/resthub'], function() {

    module('storage', {
        setup: function(){
            var diveInto = 'http://diveintohtml5.org/storage.html',
            partof = 'http://isalogo.partofhtml5.com/';
            
            $.storage.set('diveinto', diveInto);
            $.storage.set('partof', partof);
        },
        teardown: function(){
            $.storage.clear();
        }
    });
    

    test('should be ok with basic getter/setter', function() {
        equals($.storage.get('diveinto'), 'http://diveintohtml5.org/storage.html', 'should results in a good resource');
        equals($.storage.get('partof'), 'http://isalogo.partofhtml5.com/', 'should results in a good resource');
    });
    
    test('should be ok with deletion', function() {
        equals($.storage.get('diveinto'), 'http://diveintohtml5.org/storage.html', 'should results in a good resource');
        $.storage.remove('diveinto');
        equals($.storage.get('diveinto'), null, 'should be null');
        
        equals($.storage.get('partof'), 'http://isalogo.partofhtml5.com/', 'should results in a good resource');
        $.storage.clear();
        equals($.storage.get('partof'), null, 'should be null');
    });
    
    test('should be ok with custom events (storage-set)', 1, function() {
        $.subscribe('storage-set-1984', function(value) {
            equals(value, '2 + 2 = 5', 'two plus two makes four');
        });
        $.storage.set('1984', '2 + 2 = 5');

    });
    
});

