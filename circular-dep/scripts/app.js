angular
  .module('app', ['dojo'])
  .controller('MainCtrl', function(json, $scope) {
    var account = {name: 'bretts'};
    var user = {name: 'bret', account: account};
    $scope.user = user;
    account.user = $scope.user;

    $scope.$watch('user', function(a) {
      $scope.user = a;
    });
  });
