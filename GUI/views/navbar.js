'use strict';

angular.module('app.navbar', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/navbar', {
            templateUrl: 'views/navbar.html',
            controller: 'NavbarCtrl'
        });
    }])

    .controller('NavbarCtrl', function($scope) {
      $scope.user = JSON.parse(localStorage.getItem("ai_user"));
      console.log("user", $scope.user);
      $scope.logout = function() {
          localStorage.removeItem("ai_user");
          window.location.reload();
      };

    });
