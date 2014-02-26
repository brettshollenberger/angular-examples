angular
  .module('app')
  .controller('MainCtrl', ['$scope', 'users', 
    function($scope, users) {
    $scope.users = users;

    $scope.filter = {
      fuzzy: '',
      name: ''
    };

    $scope.minDate = new Date('January 1, 2000');
    $scope.maxDate = new Date();

    $scope.min = function(actual, expected) {
      return actual >= expected;
    };

    $scope.max = function(actual, expected) {
      return actual <= expected;
    };

  }]);
