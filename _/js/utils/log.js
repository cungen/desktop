function Log(msg) {
    var pre = 'desktop';
    var args = arguments;
    var log = function() {
        if (DEBUG) {
            if (window.console && window.console.log) {
                if (typeof msg !== 'undefined') {
                    window.console.log('%c ' + pre + ' log: ', 'background: #e4e4e4; color: #2196F3; font-size: 1.1em');
                    window.console.log(args.length == 1 ? args[0] : args);
                }
            }
        }
    };

    log.prototype = {
        error: function(msg) {
            if (DEBUG) {
                if (window.console && window.console.log && window.console.error) {
                    window.console.log('%c ' + pre + ' error: ', 'background: #e4e4e4; color: #dd4b39; font-size: 1.1em');
                    window.console.log(arguments);
                }
            }
        },
        success: function(msg) {
            if (DEBUG) {
                if (window.console && window.console.log) {
                    window.console.log('%c ' + pre + ' success: ', 'background: #e4e4e4; color: #006621; font-size: 1.1em');
                    window.console.log(arguments);
                }
            }
        }
    };

    return new log();
}
