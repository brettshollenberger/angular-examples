Function.prototype.inherits = function(baseclass) {
  var _constructor = this;
  _constructor = baseclass.apply(_constructor);
};

function privateVariable(object, name, value) {
  var val;
  Object.defineProperty(object, name, {
    enumerable: false,
    configurable: false,
    get: function()       { return val; },
    set: function(newval) { val = newval; }
  });

  if (value !== undefined) object[name] = value;
};

angular
  .module('BaseClass', [])
  .factory('BaseClass', ['BCBase', function(Base) {
    BaseClass      = {};
    BaseClass.Base = Base;
    return BaseClass;
  }]);
