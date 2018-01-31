'use strict';

angular.module('app.main', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/main', {
            templateUrl: 'views/main/main.html',
            controller: 'MainCtrl'
        });
    }])

    .controller('MainCtrl', function($scope, $rootScope, $http) {
        //fake data
        $scope.models = models;
        console.log($scope.models);
        $scope.users = users
        console.log($scope.users);


        
        $http.get(clienturl + 'user')
            .then(function(data) {
                console.log('data success');
                console.log(data);
                $scope.user = data.data;
                localStorage.setItem("ai_user", JSON.stringify($scope.user));

            }, function(data) {
                console.log('no user');
            });
    });
