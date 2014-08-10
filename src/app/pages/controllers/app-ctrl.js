'use strict';

/**
 * App Controller
 *
 * @param {!angular.RootScope} $rootScope
 * @param {!angular.Scope} $scope
 * @param {AppService} AppService
 * @constructor
 * @ngInject 
 */
function AppCtrl ($rootScope, $scope, AppService) {
  this._$rootScope = $rootScope;
  this._$scope = $scope;
  this._service = AppService;

  this._$rootScope.$on('$stateChangeSuccess', function () {
    this.bodyId = this._service.getBodyId();
    this.bodyClasses = this._service.getBodyClasses();
  }.bind(this));
}

angular.module('app.pages.controllers')
  .controller('AppCtrl', AppCtrl);