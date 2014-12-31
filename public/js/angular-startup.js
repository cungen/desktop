;(function() {

    var OPTIONAL_DEPENDS = [];

    var depends = ['controllers', 'services', 'directives', 'filters'];

    _.each(OPTIONAL_DEPENDS, function(m) {
        if (checkModuleIsDefined(m)) {
            depends.push(m);
        }
    });

    angular.module('desktop', depends);

    angular.bootstrap(document, ['desktop']);

    // check if the module exist.
    function checkModuleIsDefined(module) {
        try {
            angular.module(module);
            return true;
        } catch (e) {
            return false;
        }
    }
})();
