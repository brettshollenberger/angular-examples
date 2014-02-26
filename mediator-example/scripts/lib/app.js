angular
  .module('mediator', ['angularMediator'])
  .controller('MainCtrl', ['$scope', 'Order', function($scope, Order) {
    $scope.newOrder = function() { return new Order(); }
  }])
  .factory('Notification', ['$window', function($window) {
    function Notification(text) {
      this.text = text; 
      this.notify = function() { $window.alert(this.text); }
    }
    return Notification;
  }])
  .factory('Order', ['$rootScope', function($rootScope) {
    function Order() {
      this.orderNumber = 556;
      $rootScope.$broadcast('order:instantiation:success', this);
    }
    return Order;
  }])
  .factory('Invoice', ['$rootScope', function($rootScope) {
    function Invoice(order) {
      this.text = "Thank you for ordering order number " + order.orderNumber;
      $rootScope.$broadcast('invoice:instantiation:success', this);
    }
    return Invoice;
  }])
  .factory('Email', ['$rootScope', function($rootScope) {
    function Email(text) {
      this.text = text;
      this.send = function() { $rootScope.$broadcast('email:send:success', this); }
      $rootScope.$broadcast('email:instantiation:success', this);
    }
    return Email;
  }])
  .run(['angularMediator', 'Notification', 'Order', 'Invoice', 'Email',
    function(Mediator, Notification, Order, Invoice, Email) {
      Mediator.listen('order:instantiation:success').act(function(event, order) {
        new Notification("Order number " + order.orderNumber + ' created successfully.').notify();
        new Invoice(order);
      });

      Mediator.listen('invoice:instantiation:success').act(function(event, invoice) {
        new Notification(invoice.text).notify();
        new Email(invoice.text);
      });

      Mediator.listen('email:instantiation:success').act(function(event, email) {
        email.send();
      });

      Mediator.listen('email:send:success').act(function(event, email) {
        new Notification('Your email has been successfully sent!').notify();
      });
    }]);
