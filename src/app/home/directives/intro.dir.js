'use strict';

angular.module('home.directives', [])
  .directive('homeIntro', function () {
    var directiveDefinitionObject = {

      priority: 10,

      link: function () {}
    };

    return directiveDefinitionObject;
  });