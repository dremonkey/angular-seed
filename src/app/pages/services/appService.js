'use strict';

/*
 * Services are instantiated and should be class-like also and reference the "this" keyword
 *
 * Use module.service instead of module.provider or module.factory unless you need to do 
 * initialization beyond just creating a new instance of the class
 */

(function() {
  
  /**
   * App Service
   *
   * @param {service} $state
   * @param {service} $stateParams
   * @param {service} _
   * @constructor
   * @ngInject
   */
  function AppService ($state, $stateParams, _) {
    this._$state = $state;
    this._$stateParams = $stateParams;
    this._ = _;
  }

  AppService.prototype.getBodyId = function () {
    var data = this._$state.current.data;
    var id = data && data.bodyId || '';
    
    return id;
  };

  AppService.prototype.getBodyClasses = function () {
    var classes = []; // list of element classes to return
    var data = this._$state.current.data;
    var parentState = this._$state.$current.parent;
    var currentState = this._$state.$current;
    
    // Retrieve the Custom Classes 
    if (data && data.bodyClasses) {
      classes = classes.concat(data.bodyClasses.split(' '));
    }

    // Set Default Classes
    if (this._$stateParams.page) {
      classes.push('page-' + parentState.name.replace(/\./,'-'));
    }
    else {
      classes.push('page-' + currentState.name.replace(/\./,'-'));
    }

    // Class name built using merged this._$stateParam values
    var merged = 'page';
    this._.forEach(this._$stateParams, function (val, key) {
      if ('page' === key) return; // skip page number
      merged += '-' + val;
      classes.push(merged);
    });

    return classes.join(' ');
  };

  angular.module('app.pages')
    .service('AppService', AppService);

})();