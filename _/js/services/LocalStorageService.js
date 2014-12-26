angular
    .module('services')
    .factory('LocalStorageService', ['$rootScope', function($rootScope) {

        var storage = window.localStorage.getItem('appStorage');
        $rootScope.appStorage = storage ? JSON.parse(storage) : {};

        $rootScope.$watch('appStorage', function(newValue, oldValue) {
            window.localStorage.setItem('appStorage', JSON.stringify(newValue));
        }, true);

        return $rootScope.appStorage;

    }]);
