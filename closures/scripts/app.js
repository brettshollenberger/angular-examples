angular
    .module('app', [])
    .controller('MainCtrl', function() {
      var count = 0;
      scope.increment = function() {
        count++;
      }
    });

