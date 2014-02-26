'use strict';

describe('singleton', function() {

  var singleton;
  beforeEach(module('app'));

  beforeEach(inject(function(_singleton_) {
    singleton = _singleton_;
  }));

  describe('Your first test', function() {

    it('does something meaningful', function() {
      expect(singleton.name).toEqual('');
    });

  });

});
