angular
    .module('controllers')
    .controller('TaskController', [
        '$scope',
        'LocalStorageService',
        function($scope, LocalStorageService) {

            console.log($scope);
            $scope.$watch(function() {
                return $('.window').length;
            }, function(newValue, oldValue) {
                console.log(11);
            });

        }
    ]);
