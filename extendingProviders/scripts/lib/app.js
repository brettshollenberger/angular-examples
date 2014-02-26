angular
    .module('FacultyDispatch', []);

angular
    .module('FacultyDispatch.Routing', [])
    .provider('facultyRoute', ['$routeProvider', function($routeProvider) {
        this.when = function(path, route) {
            routes[path] = angular.extend(
              {reloadOnSearch: true},
              route,
              path && pathRegExp(path, route)
            );

            // create redirection for trailing slashes
            if (path) {
              var redirectPath = (path[path.length-1] == '/')
                    ? path.substr(0, path.length-1)
                    : path +'/';

              routes[redirectPath] = angular.extend(
                {redirectTo: path},
                pathRegExp(redirectPath, route)
              );
            }

            return this;
        };
        this.$get = function() {
            return {a: 'b'};
        };
    }]);
