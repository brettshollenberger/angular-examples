angular
  .module('Mocks', ['BaseClass'])
  .factory('Mocks', ['Post', function(Post) {
    return {
      Post: Post
    };
  }]);
