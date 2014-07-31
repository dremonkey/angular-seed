'use strict';

(function() {

  function homeDirective () {

    function link () {}
    
    return {
      restrict: 'A',
      priority: 10,
      link: link
    };
  }

  angular.module('app.pages.directives')
    .directive('home', homeDirective);
})();