angular
  .module('app', ['ng', 'ngRoute'])
  .config(['$routeProvider', '$httpProvider', function(Router, $http) {
    Router
      .when('/', {
        controller: 'MainCtrl'
      })
      .when('/post/:title', {
        controller: 'MainCtrl'
      });
      $http.defaults.useXDomain = true;
      delete $http.defaults.headers.common['X-Requested-With'];
  }]);
