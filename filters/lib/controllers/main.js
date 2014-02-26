angular
  .module('app')
  .controller('MainCtrl', ['$scope', 'users', 
    function($scope, users) {
    $scope.users = users;

    $scope.filter = {
      fuzzy: ''
    };

    $scope.max = function(actual, expected) {
      return actual <= expected;
    };

    $scope.min = function(actual, expected) {
      return actual >= expected;
    };

  }]);
