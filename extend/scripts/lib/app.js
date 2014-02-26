angular
  .module('app', [])
  .factory('SuperArray', ['enumerable', function(enumerable) {
    return function SuperArray() {
      var superArray = [];
      for (var i in arguments) superArray.push(arguments[i]);
      pk.mixin(superArray, enumerable);
      return superArray;
    };
  }])
  .factory('enumerable', function() {
    return {
      each: {
        enumerable: false,
        value: function(cb) {
          for (var i in this) {
            cb(this[i]);
          }
        }
      },
      all: {
        enumerable: false,
        value: function(cb) {
          var truth = true;
          this.each(function(i) { if (!cb(i)) truth = false; });
          return truth;
        }
      },
      any: {
        enumerable: false,
        value: function(cb) {
          var truth = false;
          this.each(function(i) { if (cb(i)) truth = true; });
          return truth;
        }
      },
      collect: {
        enumerable: false,
        value: function(cb) {
          var returner = [];
          this.each(function(i) { returner.push(cb(i)); });
          return returner;
        }
      },
      first: {
        enumerable: false,
        value: function(num) {
          var returner = [];
          var num = num || 1;
          var count = 1;
          this.each(function(i) { if (count <= num) returner.push(i); count++; });
          return returner;
        }
      },
      include: {
        enumerable: false,
        value: function(what) {
          var truth = false;
          this.each(function(i) { if (i == what) truth = true; });
          return truth;
        }
      },
      count: {
        enumerable: false,
        value: function(block) {
          if (!block) return this.length;
          var count = 0;
          this.each(function(i) { if (block(i)) count += 1; });
          return count;
        }
      },
      detect: {
        enumerable: false,
        value: function(block) {
          var returner;
          for (var i in this) {
            if (block(this[i])) {
              returner = this[i];
              break;
            }
          }
          return returner;
        }
      },
      drop: {
        enumerable: false,
        value: function(num) {
          return this.slice(num);
        }
      }
    };
  });
