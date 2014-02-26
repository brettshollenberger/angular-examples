describe('BaseClass', function() {

  var Mocks, Post, Author, post, author;

  beforeEach(module('BaseClass'));
  beforeEach(module('Mocks'));

  beforeEach(inject(function(_Mocks_) {
    Mocks  = _Mocks_;
    Post   = Mocks.Post;
    Author = Mocks.Author;

    post   = Post.new({title: 'My Great Post'});
    author = Author.new({email: 'brett.shollenberger@gmail.com'});
  }));

  describe('Validations', function() {
    describe('Required validation', function() {
      beforeEach(function() {
        post.title = undefined;
      });

      it('is invalid if the field is blank', function() {
        expect(post.$valid).toBe(false);
      });

      it('contains a default error message', function() {
        post.validate();
        expect(post.$errors.title).toContain('is required');
      });
    });

    describe('Email validation', function() {
      beforeEach(function() {
        author.email = 'porkypig';
      });

      it('is invalid if it is not an email address', function() {
        expect(author.$valid).toBe(false);
      });

      it('contains a default error message', function() {
        author.validate();
        expect(author.$errors.email).toContain('is not a valid email');
      });
    });

    describe('Regex validation', function() {
      beforeEach(function() {
        post.uuid = 'awesome';
      });

      it('is invalid if it does not follow the specified format', function() {
        expect(post.$valid).toBe(false);
      });

      it('contains a default error message', function() {
        post.validate();
        expect(post.$errors.uuid).toContain('is not the correct format');
      });
    });

    describe('Custom validations', function() {
      beforeEach(function() {
        author.email = 'awesome@times.com';
      });

      it('is invalid if it does not pass the custom validation', function() {
        expect(author.$valid).toBe(false);
      });

      it('contains a default error message', function() {
        author.validate();
        expect(author.$errors.email).toContain('must be fun!');
      });
    });
  });
});
