'use strict';

angular.module('app.navbar', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/navbar', {
            templateUrl: 'views/navbar.html',
            controller: 'NavbarCtrl'
        });
    }])

    .controller('NavbarCtrl', function($scope, $rootScope, $http, $routeParams, $location) {

        $scope.logout = function() {
            localStorage.removeItem("ipfs-ai-models-market-data");
            window.location.reload();
        };

    });
