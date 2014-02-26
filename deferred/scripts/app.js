var githubService = ['$q', '$http', function($q, $http) {
  var deferred = $q.defer();
  // Get list of open angular js pull requests from github
  $http.get('https://api.github.com/repos/angular/angular.js/pulls')
    .success(function(data) {
      deferred.resolve(data);
    })
    .error(function(reason) {
      deferred.reject(reason);
    });
  return deferred.promise;

}];

angular
  .module('app', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        resolve: {github: githubService}
      });
  }])
  .controller('MainCtrl', ['$scope', '$route', '$rootScope', function($scope, $routeParams, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function(event, current, previous, rejection) {
      $scope.github = current.locals.github;
    })
  }]);
  
