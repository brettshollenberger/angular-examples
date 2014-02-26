describe('SuperArray', function() {
  var SuperArray;
  beforeEach(module('app'));
  beforeEach(inject(function(_SuperArray_) {
    SuperArray  = _SuperArray_;
    superArray  = new SuperArray(1, 2, 3);
  }));

  it('mixes in first', function() {
    expect(superArray.first()).toEqual([1]);
    expect(superArray.first(2)).toEqual([1, 2]);
  });

  it('mixes in all', function() {
    expect(superArray.all(function(num) { return num >= 1; })).toBe(true);
    expect(superArray.all(function(num) { return num > 1;  })).toBe(false);
  });

  it('mixes in any', function() {
    expect(superArray.any(function(num) { return num == 1; })).toBe(true);
    expect(superArray.any(function(num) { return num == 4; })).toBe(false);
  });

  it('mixes in collect', function() {
    expect(superArray.collect(function(num) { return num + 1; })).toEqual([2, 3, 4]);
    expect(superArray.collect(function(num) { return num + ' super cool'})).toEqual([
      '1 super cool',
      '2 super cool',
      '3 super cool'
    ]);
  });

  it('mixes in include', function() {
    expect(superArray.include(1)).toBe(true);
    expect(superArray.include(4)).toBe(false);
  });

  it('mixes in count', function() {
    expect(superArray.count()).toBe(3);
    expect(superArray.count(function(num) { return num >= 2; })).toEqual(2);
  });

  it('mixes in detect', function() {
    expect(superArray.detect(function(num) { return num == 2; })).toBe(2);
    expect(superArray.detect(function(num) { return num > 2; })).toBe(3);
  });

  it('mixes in drop', function() {
    expect(superArray.drop(1)).toEqual([2, 3]);
    expect(superArray.drop(2)).toEqual([3]);
  });
});
