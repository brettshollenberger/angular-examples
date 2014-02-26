angular
  .module('app', [])
  .controller('MainCtrl', function($scope, $rootScope) {

    function User(data) {
      var user = this;
      this.first             = data.first || '';
      this.last              = data.last  || '';
      this.emergencyContact1 = data.emergencyContact1 || {};
      this.emergencyContact2 = data.emergencyContact2 || {};

      this.addEmergencyContact1 = function(contact) {
        this.emergencyContact1 = contact;
      };

      this.addEmergencyContact2 = function(contact) {
        this.emergencyContact2 = contact;
      };

      Object.defineProperty(this, 'full', {
        get: function() { return this.first + ' ' + this.last; }
      });

      var emergencyContacts;
      Object.defineProperty(this, 'emergencyContacts', {
        get: function() { return emergencyContacts; },
        set: function() { emergencyContacts = [this.emergencyContact1, this.emergencyContact2]; }
      });
      this.emergencyContacts = 'set emergency contacts';

      $scope.$watch(function() { return user.emergencyContact1 }, function(contact) {
        user.emergencyContacts = 'set';
      });

      $scope.$watch(function() { return user.emergencyContact2 }, function(contact) {
        user.emergencyContacts = 'set';
      });

    };

    $scope.user  = new User({});
    $scope.user2 = new User({first: 'Corey', last: 'Pace'});
    $scope.user3 = new User({first: 'Tag', last: 'Taggart'});

    $scope.otherUsers = [$scope.user2, $scope.user3]
  });
