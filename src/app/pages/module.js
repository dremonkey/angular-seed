'use strict';

angular.module('particle.pages', ['ui.router.compat', 'particle.pages.controllers', 'particle.pages.directives'])
  .config(function ($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'pages/templates/home.tpl.html',
        controller: 'HomeCtrl',
        data: {
          bodyId: 'home'
        }
      });
  });

angular.module('particle.pages.controllers', []);
angular.module('particle.pages.directives', []);