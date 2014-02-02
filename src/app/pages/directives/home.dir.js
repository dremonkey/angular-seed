'use strict';

angular.module('particle.pages.directives')

  .directive('home', function () {
    var def = {};
    
    def = {
      priority: 10,
      link: function () {}
    };

    return def;
  });