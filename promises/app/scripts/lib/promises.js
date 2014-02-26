'use strict';

angular
  .module('app', [])
  .provider('promises', function() {
    this.$get = function($q) {
      var defer = $q.defer();
      defer.promise.then(function() {
        return {
          cool: 'dog'
        };
      });
      return defer;
    };
  });
