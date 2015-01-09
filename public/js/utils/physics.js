;(function(window, document, undefined) {
    window.Physics = Physics = function() {
        return new Physics.fn.init();
    };

    Physics.fn = Physics.prototype = {
        init: function() {
            console.log('11');
            return this;
        }
    };

    Physics.fn.init.prototype = Physics.fn;

    Physics.fn.test = function() {
        console.log('test');
    };


})(window, document, undefined);

