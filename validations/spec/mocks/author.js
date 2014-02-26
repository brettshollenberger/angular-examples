angular
  .module('Mocks')
  .provider('Author', [function() {
    this.$get = ['BaseClass', function(BaseClass) {
      function Author(attributes) {
        if (!attributes) attributes = {};

        this.email = attributes.email;

        this.validates({
          email: { format: { type: 'email' },
                   fun: { validator: fun, message: 'must be fun!' } }
        });
      };

      function fun(instance, value, options) {
        return !!(value.match(/fun/));
      };

      Author.inherits(BaseClass);
      return Author;
    }];
  }]);
