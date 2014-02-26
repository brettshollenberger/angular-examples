angular
  .module('Mocks')
  .provider('Post', [function() {
    this.$get = ['BaseClass', function(BaseClass) {
      function Post(attributes) {
        if (!attributes) attributes = {};

        this.title = attributes.title;
        this.uuid  = attributes.uuid;

        this.validates({
          title: { required: true },
          uuid:  { format: { regex: /\d{3}/ } } 
        });
      };

      Post.inherits(BaseClass);
      return Post;
    }];
  }]);
