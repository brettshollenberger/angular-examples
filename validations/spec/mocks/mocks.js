angular
  .module('Mocks', ['BaseClass'])
  .provider('Mocks', [function() {
    this.$get = ['Post', 'Author', function(Post, Author) {
      var Mocks    = {};
      Mocks.Post   = Post;
      Mocks.Author = Author;

      return Mocks;
    }];
  }]);

