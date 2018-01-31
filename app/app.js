'use strict';

var ipfs_url = "http://127.0.0.1:5001/api/v0/";
angular.module('app', [
    'ngRoute',
    'ngMessages',
    'angularBootstrapMaterial',
    'ui.bootstrap',
    'toastr',
    'chart.js',
    'app.navbar',
    'app.newuser',
    'app.main',
    'app.newmodel'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider.otherwise({
            redirectTo: '/main'
        });
    }])
    .config(function(toastrConfig) {
        angular.extend(toastrConfig, {
            autoDismiss: false,
            containerId: 'toast-container',
            maxOpened: 0,
            newestOnTop: true,
            positionClass: 'toast-bottom-right',
            preventDuplicates: false,
            preventOpenDuplicates: false,
            target: 'body'
        });
    });
