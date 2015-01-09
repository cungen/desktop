(function(window) {
    var _log = function Log() {
        return new _log.fn.init(arguments);
    };

    _log.fn = _log.prototype = {
        pre: 'desktop',
        init: function(args) {
            var DEBUG = typeof DEBUG !== 'undefined' ? DEBUG : true;
            if (window.console && window.console.log) {
                if (DEBUG) {
                    if (args[0]) {
                        window.console.log('%c ' + this.pre + ' (' + getDateString() + ')', 'color: #aaaaaa; font-size: 1.1em;');
                        window.console.log.apply(console, args);
                    }
                }
            } else {
                alert('console not defined');
            }

            return this;
        }
    };

    function getDateString() {
        var date = [];
        date.push(new Date().getFullYear() + '-');
        date.push(new Date().getMonth() + 1 + '-');
        date.push(new Date().getDate() + ' ');
        date.push(new Date().getHours() + ':');
        date.push(new Date().getMinutes() + ':');
        date.push(new Date().getSeconds() + ' ');
        date.push(new Date().getMilliseconds());
        return date.join('');
    }

    _log.fn.init.prototype = _log.fn;

    window.Log = _log;
    var keys = [];
    for (var k in console) keys.push(k);

    keys.forEach(function(element, index, array) {
        Log[element] = function() {
            var DEBUG = typeof DEBUG !== 'undefined' ? DEBUG : true;
            if (DEBUG) {
                window.console.log('%c ' + _log.fn.pre + ' (' + getDateString() + ')', 'color: #aaaaaa; font-size: 1.1em;');
                console[element].apply(console, arguments);
            }
        };
    });

})(window);
