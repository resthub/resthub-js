/**
 * Minimal CommonJS console implementation.
 * Doesn't support advanced feature if not available through original console
 * @see http://wiki.commonjs.org/wiki/Console
 * @author Florian Traverse, Damien Feugas
 */

(function(window, console) {

define(['lib/jquery'], function() {
    
    var hasConsole = console && !!console.log,
    methods = [
        'debug', 'trace', 'assert', 'dir', 
        'dirxml', 'group', 'groupEnd', 'time',
        'timeEnd', 'profile', 'profileEnd', 'count'
    ];
    
    /**
     * Defines the logger configuration.
     * 
     * This map takes logger name as key, and level as value. The logger name is found in log messages, 
     * between brackets:
     *      console.info('[logger.name] My info to log');
     * [logger.name] is searched into this map, and if found, the log level is eventually filtered.
     * If the name is not found, or if there is no logger name, the log is displayed.
     * 
     * levels are (level: authorized methods)
     * - all: console.debug(), console.info(), console.warn(), console.error()
     * - debug: console.debug(), console.info(), console.warn(), console.error()
     * - info: console.info(), console.warn(), console.error()
     * - warn: console.warn(), console.error()
     * - error: console.error()
     * - none: no logs
     */
    window.LOGGER_CONF = {};
    
    /**
     * Checks if a log command may be displayed or not.
     * Depends on the log command and the level desired.
     * 
     * @param commandName Filtered log command: 'debug', 'info', 'warn', 'error'.
     * @param level Desired level: 'all', 'debug', 'info', 'warn', 'error', 'none'.
     * 
     * @return True if the command must be displayed, false otherwise.
     */
    $.isLogEnabled = function(commandName, level) {
        var order={'all':0, 'debug':1, 'info':2, 'warn':3, 'error':4, 'off':5};
        return order[commandName] >= (level in order ? order[level] : 0);
    };
    
    var logger, notSupported = function() {};
    logger = hasConsole ? console : {log: notSupported };

    if(!hasConsole) {
        window.console = logger;
    }
    
    
    /**
     * Wraps the original log command with an anonym method that behave likes an Around AOP advisor.
     * Do not execute the wrapped method if a logger.name is found and configured to be filtered.
     * If the original log command is not available, use an empty method.
     * 
     * @param commandName
     */
    var wrap = function(commandName) {
        var original = window.console && commandName in window.console ? window.console[commandName] : logger.log;
        var originalObj = window.console || logger;
        
        // ie8 console functions seems to be invokable object... typeof console.log === 'object'
        // no .apply .call as well, meaning no filter feature for IE8
        if(!$.isFunction(original)) return;
        
        logger[commandName] = function(){
            // Gets the first part that define logger.
            var loggerName = arguments.length >= 1 && typeof(arguments[0]) == 'string'? arguments[0]
                .substring(1, arguments[0].indexOf(']')): null;
                
            // Filter if the logger name exists, is found in the conf, and if the level is suffisant
            if (loggerName == null || !(loggerName in LOGGER_CONF) || 
                    $.isLogEnabled(commandName, LOGGER_CONF[loggerName])) {
                original.apply(originalObj, arguments);    
                
            }
        };
    };
    
    /**
     * Method to add a fallback behaviour if a command is not supported.
     * 
     * @param command The log command.
     * @return The command, or its fallback if not supported.
     */
    var fallback = function(command) {
        return window.console && command in window.console ? window.console[command] : notSupported;
    };
    
    // log features
    wrap('debug');
    wrap('info');
    wrap('warn');
    wrap('error');
    
    // other features that ar not log related 
    // (also add debug to be more defensive towards special ie8 case)
    $.each(methods, function(i, val){
        logger[val] = fallback(val);
    });
        
    return logger;
});


    
})(this, this.console);
