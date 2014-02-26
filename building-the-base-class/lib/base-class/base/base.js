angular
  .module('BaseClass')
  .factory('BCBase', ['BCCache', function(Cache) {
    function Base(attributes) {
      var _constructor = this;
      var _prototype   = _constructor.prototype;
      privateVariable(_constructor, 'primaryKey', 'id');

      function cache(instance) {
        _constructor.cached.cache(instance, _constructor.primaryKey);
      };
      
      _constructor.new = function(attributes) {
        var instance = new _constructor(attributes);
        cache(instance);
        return instance;
      };

      _constructor.cached = new Cache();
    };

    return Base;
  }]);
