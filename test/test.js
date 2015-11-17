var assert = require('assert');

describe('Array', function() {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    });

    it('should return the index of a value', function () {
      assert.equal(2, [1,2,3].indexOf(3));
      assert.equal(0, [1,2,3].indexOf(1));
    })
  });

  describe('#indexOf', function() {

  })
});
