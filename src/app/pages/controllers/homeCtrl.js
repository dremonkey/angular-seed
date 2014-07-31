'use strict';

(function() {

  /**
   * App Controller
   *
   * @param {!angular.Scope} $scope
   * @constructor
   * @ngInject 
   */
  function HomeCtrl ($scope) {
    // The controllerAs syntax uses the this keyword inside controllers instead of $scope
    this._$scope = $scope;
  }

  angular.module('app.pages.controllers').controller('HomeCtrl', HomeCtrl);
})();