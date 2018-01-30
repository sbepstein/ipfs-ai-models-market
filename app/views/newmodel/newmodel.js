'use strict';

angular.module('app.newmodel', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/newmodel', {
            templateUrl: 'views/newmodel/newmodel.html',
            controller: 'NewModelCtrl'
        });
    }])

    .controller('NewModelCtrl', function($scope, $rootScope, $http) {

        
    });
