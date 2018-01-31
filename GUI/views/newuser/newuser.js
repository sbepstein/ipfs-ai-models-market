'use strict';

angular.module('app.newuser', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/newuser', {
      templateUrl: 'views/newuser/newuser.html',
      controller: 'NewUserCtrl'
    });
  }])

  .controller('NewUserCtrl', function($scope, $rootScope, $http, toastr) {

    $scope.user = {};

    $scope.createUser = function() {
      toastr.info("Generating RSA Key pair");
      //add the user to storage
      $http({
              url: clienturl + 'createuser',
              method: "POST",
              headers: {
                  "Content-Type": undefined
              },
              data: $scope.user
          })
          .then(function(data) {
                  console.log("data: ");
                  console.log(data.data);
                  window.location="/";
                  toastr.success("User created");
              },
              function(data) {
                  console.log(data);
              });


    };



  });
