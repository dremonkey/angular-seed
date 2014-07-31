'use strict';

(function () {

  /**
   * Provides General Utility Methods
   */
  function UtilService () {
    var _UtilService = {};

    /**
     * Returns a random integer between min and max
     * Using Math.round() will give you a non-uniform distribution!
     */
    _UtilService.getRandomInt = function (min, max) {
      min = min || 0;
      max = max || 100;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    /**
     * Recursively traverse an element and extract all child nodes
     */
    _UtilService.getNodes = function (el, elements) {
      elements = elements || [];
      elements.push(el);

      var children = el.childNodes;

      for (var i=0; i < children.length; i++) {
        if (children[i].nodeType === 1) {
          elements = _UtilService.getNodes(children[i], elements);
        }
      }

      return elements;
    };

    return _UtilService;
  }

  angular.module('app.common.utils')
    .factory('UtilService', UtilService);

})();