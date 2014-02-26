var Mocks, BaseClass, Post;
beforeEach(module('BaseClass'));
beforeEach(module('Mocks'));
beforeEach(inject(function(_BaseClass_, _Mocks_) {
  BaseClass = _BaseClass_;
  Mocks     = _Mocks_;
  Post      = Mocks.Post;
}));
