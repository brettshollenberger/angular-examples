angular
  .module('mediator', ['lsMediator'])
  .controller('MainCtrl', ['Order', '$scope', function(Order, $scope) {
    $scope.newOrder = function() { return new Order(); }
  }])
  .factory('Order', ['$rootScope', function($rootScope) {
    function Order() {
      this.orderNumber = 665;
      $rootScope.$broadcast('order:instantiation:success', this);
    }
    return Order;
  }])
  .factory('Invoice', ['$rootScope', function($rootScope) {
    function Invoice(order) {
      this.text = "Thank you for placing order number " + order.orderNumber;
      $rootScope.$broadcast('invoice:instantiation:success', this);
    }
    return Invoice;
  }])
  .factory('Email', ['$rootScope', function($rootScope) {
    function Email(text) {
      this.text = text;
      this.send = function() { $rootScope.$broadcast('email:send:success', this); };
      $rootScope.$broadcast('email:instantiation:success', this);
    }
    return Email;
  }])
  .factory('Notification', ['$window', function($window) {
    function Notification(text) {
      this.text   = text;
      this.notify = function() { $window.alert(this.text); };
    }
    return Notification;
  }])
  .run(['lsMediator', 'Order', 'Invoice', 'Email', 'Notification',
    function(Mediator, Order, Invoice, Email, Notification) {
      Mediator.listen('order:instantiation:success').act(function(event, order) {
        new Notification("Order created for " + order.orderNumber).notify();
        new Invoice(order);
      });

      Mediator.listen('invoice:instantiation:success').act(function(event, invoice) {
        new Notification("New invoice created. Here it is: '" + invoice.text + "'").notify();
        new Email(invoice.text);
      });

      Mediator.listen('email:instantiation:success').act(function(event, email) {
        email.send();
      });

      Mediator.listen('email:send:success').act(function(event, email) {
        new Notification('Email successfully sent!').notify();
      });
    }]);
