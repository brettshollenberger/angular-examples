angular
  .module('BaseClass')
  .factory('BCCache', function() {
    function Cache() {
      privateVariable(this, 'cache', function(instance, primaryKey) {
        if (instance && instance[primaryKey] !== undefined) {
          this[instance[primaryKey]] = instance;
        };
      });

      privateVariable(this, 'isEmpty', function() {
        return !!(!Object.keys(this).length);
      });

      privateVariable(this, 'where', function(terms) {
        return _.where(this, terms, this);
      });
    };

    return Cache;
  });
