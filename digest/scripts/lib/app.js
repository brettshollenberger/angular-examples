angular
  .module('app', [])
  .directive('updater', function() {
    return {
      scope: {
        user: '='
      },
      template: '<button>Change User.data to whaaaat?</button>',
      link: function(scope, element, attrs) {
        element.on('click', function() {
          scope.user.data = 'whaaaat?';
          scope.$apply();
        });
      }
    };
  })

  // No provider; two new objects
  .controller('FirstCtrl', ['$scope', function($scope) {
    $scope.user = { data: 'cool' };
  }])
  .controller('SecondCtrl', ['$scope', function($scope) {
    $scope.user = { data: 'cool' };
  }])

  // Provider returns the same object
  .controller('ThirdCtrl', ['$scope', 'User', function($scope, User) {
    $scope.user = User;
  }])
  .controller('FourthCtrl', ['$scope', 'User', function($scope, User) {
    $scope.user = User;
  }])
  .provider('User', function() {
    this.$get = function() {
      return {
        data: 'cool'
      };
    };
  })

  // Provider returns a constructor. Constructors make distinct objects.
  .controller('FifthCtrl', ['$scope', 'UserModel', function($scope, UserModel) {
    $scope.user = new UserModel();
  }])
  .controller('SixthCtrl', ['$scope', 'UserModel', function($scope, UserModel) {
    $scope.user = new UserModel();
  }])
  .provider('UserModel', function() {
    this.$get = function() {
      return function() {
        this.data = 'cool';
      };
    };
  })

  // Caching model looks up the user by id and returns the same one, if it's already been
  // instantiated. The two models are kept in sync.
  .controller('SeventhCtrl', ['$scope', 'SmartUserModel', function($scope, SmartUserModel) {
    $scope.user = new SmartUserModel(1);
  }])
  .controller('EighthCtrl', ['$scope', 'SmartUserModel', function($scope, SmartUserModel) {
    $scope.user = new SmartUserModel(1);
  }])
  .provider('SmartUserModel', function() {
    
    this.$get = ['$timeout', function($timeout) {
      var User = function User(id) {
        if (User.cached[id]) return User.cached[id];
        this.data = 'cool';
        User.cached[id] = this;
      };
      User.cached = {};
      return User;
    }];
  });
  
