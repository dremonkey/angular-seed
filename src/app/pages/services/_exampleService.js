'use strict';

/*
 * Services are instantiated and should be class-like also and reference the "this" keyword
 *
 * Use module.service instead of module.provider or module.factory unless you need to do 
 * initialization beyond just creating a new instance of the class
 */

(function() {
  
  /**
   * @param {!angular.HTTP} $http
   * @constructor
   * @ngInject
   */
  function ExampleService ($http) {
    this._$http = $http;
  }

  ExampleService.prototype.someMethod = function () {};

  angular.module('app.pages')
    .service('ExampleService', ExampleService);

})();