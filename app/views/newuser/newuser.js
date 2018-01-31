'use strict';

angular.module('app.newuser', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/newuser', {
      templateUrl: 'views/newuser/newuser.html',
      controller: 'NewUserCtrl'
    });
  }])

  .controller('NewUserCtrl', function($scope, $rootScope, $http, toastr) {

    

    $scope.create = function() {

      //add the file to ipfs
      /*$http({
          url: ipfs_url + 'add',
          method: "POST",
          headers: {
            "Content-Type": undefined
          },
          data: formdata
        })
        .then(function(data) {
            console.log("data: ");
            console.log(data.data);
            toastr.success("Model added to IPFS");
          },
          function(data) {
            console.log(data);
            toastr.error("Error adding Model to IPFS");
          });*/

      //add the data to blockchain
      ipcRenderer.send('newuser', $scope.user);


    };



  });
