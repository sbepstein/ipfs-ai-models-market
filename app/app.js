'use strict';

angular.module('app', [
    'ngRoute',
    'ngMessages',
    'angularBootstrapMaterial',
    'ui.bootstrap',
    'toastr',
    'chart.js',
    'app.navbar',
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