'use strict';

// Declare app level module
angular.module('app', [
  'common',
  'home',
  'templates' // dynamically generated by the grunt-angular-templates task
]);

angular.module('app')
  .config(function ($locationProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');

    // enable the HTML5 push/pop history API  
    $locationProvider.html5Mode(true);
  })
  .run(function ($rootScope,   $state,   $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  });