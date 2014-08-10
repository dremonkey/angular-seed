'use strict';

/**
 * Should use the 'controllerAs' style to export the controller onto the scope
 * The keyword "this" is bound to $scope
 *
 * Controllers are classes. Methods should be defined on Ctrl.prototype
 */

/**
 * Example Controller
 *
 * @param {!angular.Scope} $scope
 * @constructor
 * @ngInject 
 */
function ExampleCtrl ($scope) {
  this._$scope = $scope;
}

ExampleCtrl.prototype.someMethod = function () {};

angular.module('app.pages.controllers').controller('ExampleCtrl', ExampleCtrl);