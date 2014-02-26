angular
    .module('app', [])
    .controller('MainCtrl', function($scope, Order) {
      $scope.newOrder = function() { new Order(); }
    })
    .factory('$emit', function($rootScope) {
      return function() { $rootScope.$emit.apply($rootScope, arguments); }
    })
    .factory('Order', function($emit) {
      function Order() {
        this.email   = 'brett.shollenberger@gmail.com';
        this.product = 'Macbook Pro';
        $emit('order:created', this);
      }
      return Order;
    })
    .factory('Email', function($window) {
      function Email(text) {
        $window.alert(text);
      }
      return Email;
    })
    .run(function($rootScope, Email) {
      $rootScope.$on('order:created', function(event, order) {
        new Email('Email sent to ' + order.email + ' for ' + order.product);
      });
    });
