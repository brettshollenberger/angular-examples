var app = angular.module('app', []);

app.controller('MainCtrl', function($scope) {
  $scope.user = {
    name: 'Brett',
    email: 'brett.shollenberger@gmail.com',
    age: '24'
  };

  // $scope.email = $scope.user.email;
});

app.directive('interp', function() {
  return {
    scope: { user: '=' },
    link: function(scope) {
    }
  };
});
