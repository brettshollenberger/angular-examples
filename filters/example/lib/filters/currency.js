angular
  .module('app')
  .filter('currency', function() {
    return function(value) {
      return '$' + value;
    };
  });
