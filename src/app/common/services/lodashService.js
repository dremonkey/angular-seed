'use strict';

(function () {
  
  /**
   * Allows lodash to be injected
   */
  function _ () {
    return window._;
  }

  angular.module('app.common.utils')
    .factory('_', _);

})();