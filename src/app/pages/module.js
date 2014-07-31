'use strict';

(function() {

  angular.module('app.pages', ['ui.router.compat', 'app.pages.controllers', 'app.pages.directives']);
  angular.module('app.pages.controllers', []);
  angular.module('app.pages.directives', []);

  /* @ngInject */
  function config ($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'pages/templates/home.tpl.html',
        controller: 'HomeCtrl',
        controllerAs: 'home',
        data: {
          bodyId: 'home'
        }
      })

      .state('about', {
        url: '/about',
        templateUrl: 'pages/templates/about.tpl.html',
        controller: 'HomeCtrl',
        controllerAs: 'about',
        data: {
          bodyId: 'about'
        }
      });
  }

  angular.module('app.pages')
    .config(config);

})();