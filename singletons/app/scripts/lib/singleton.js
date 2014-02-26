'use strict';

angular
  .module('app', [])
  .service('singleton', [function(name) {
    this.name = name;
  }]);
