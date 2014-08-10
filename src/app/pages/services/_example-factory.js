'use strict';

/*
 * Factories give us a singleton module for creating service methods
 * They can also return primatives if so desired
 *
 * A "factory" is in fact a pattern/implementation, and shouldn't be part of the provider's name. 
 * All factories and services should be called "services" or "srv"
 *
 * We create an Object with the same name inside the function. This can aid documentation as well for 
 * comment-generated docs 
 */

function Service () {
  var _Service = {};
 
  _Service.someValue = '';
  _Service.someMethod = function () {};
}

angular.module('app')
  .factory('Service', Service);