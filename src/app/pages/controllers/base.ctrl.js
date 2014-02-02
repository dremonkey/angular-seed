'use strict';

angular.module('particle.pages.controllers')

  .controller('BaseCtrl', function ($rootScope, $scope, $state) {
    var getBodyId, getBodyClasses;

    getBodyId = function () {
      if ($state.current.data && $state.current.data.bodyId)
        return $state.current.data.bodyId;
      return $state.current.name.replace('.','-');
    };

    getBodyClasses = function () {
      if ($state.current.data && $state.current.data.bodyClasses)
        return $state.current.data.bodyClasses;
      return '';
    };

    console.log(getBodyId());

    $rootScope.$on('$stateChangeSuccess', function () {
      $scope.bodyId = getBodyId();
      $scope.bodyClasses = getBodyClasses();
    });
  });