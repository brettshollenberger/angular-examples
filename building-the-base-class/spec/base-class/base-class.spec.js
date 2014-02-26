describe('BaseClass', function() {
  describe('Inheritance', function() {
    beforeEach(function() {
      Post.inherits(SomeBaseClass);

      function SomeBaseClass(attributes) {
        var _constructor = this;
        var _prototype   = _constructor.prototype;

        _constructor.new = function(attributes) {
          var instance = new _constructor(attributes);
          return instance;
        };

        _prototype.$save = angular.noop;
      };
    });

    it('adds methods to the child class', function() {
      expect(Post.new).toBeDefined();
    });

    it('adds methods to the instances', function() {
      var post = Post.new({});
      expect(post.$save).toBeDefined();
    });
  });
});
