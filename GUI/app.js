'use strict';

var ipfsurl = "http://127.0.0.1:5001/api/v0/";
var clienturl = "http://127.0.0.1:6001/";

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
    'app.newmodel',
    'app.profile'
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
