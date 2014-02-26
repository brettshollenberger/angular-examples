var app = angular.module('app', []);

app.controller('MainCtrl', function($scope) {
  $scope.money = "disabled";
});

app.directive('money', function() {
  return {
    restrict: 'A',
    require: '^ngModel',
    link: function(scope, element, attrs, ctrl) {
      var validator = function(value) {
        if (!value) return;
        if (value == 'disabled') return "screwed up";
        return value + "?! fuck!" ;
      };

      // ctrl.$formatters.push(validator);
      ctrl.$parsers.push(validator);
      scope.money = 'fuck';

      // scope.$watch(function() {
      //   return ctrl.$modelValue;
      // }, function(modelValue) {
      //   validator(modelValue);
      //   console.log(ctrl.$formatters);
      // });

      // scope.$watch(function() {
      //   return ctrl.$viewValue;
      // }, function(viewValue) {
      //   validator(viewValue);
      // });
    }
  };
});
