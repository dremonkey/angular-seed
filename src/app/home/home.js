'use strict';

angular.module('home', ['ui.compat', 'home.controllers', 'home.directives'])
  .config(function ($stateProvider) {

    // console.log($templateCache);
    console.log($stateProvider);

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home/templates/home.tpl.html',
        controller: 'HomeCtrl'
      });
  });