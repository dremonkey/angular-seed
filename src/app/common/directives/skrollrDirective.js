'use strict';

/**
 * Attach to any element that needs the skrollr functionality
 */
(function () {

  function skrollrDirective (UtilityService) {
    
    /**
     * @ngInject 
     */
    function link ($scope, $element) {
      var _skrollr = window.skrollr.get();

      if ('undefined' === typeof(_skrollr)) {
        _skrollr = skrollr.init();
      }
      else {
        var elements = UtilityService.getNodes($element[0]);
        _skrollr.refresh(elements);
      }
    }

    return {
      restrict: 'A',
      link: link
    };
  }

  angular.module('app.common.directives')
    .directive('skrollr', skrollrDirective);
})();