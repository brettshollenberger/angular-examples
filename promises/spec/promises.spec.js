'use strict';

describe('promises', function() {

  var promises;
  beforeEach(module('app'));

  beforeEach(inject(function(_promises_) {
    promises = _promises_;
  }));

  describe('Your first test', function() {

    it('does something meaningful', function() {
      var data;
      promises.resolve().then(function(e) {
        data = e;
      });
      expect(data).toEqual(true);
    });

  });

});
