'use strict';

var assert = require('assert');
var molarmass = require('../index');

// beforeEach(function() {
//   console.log('beforeEach');
// })

describe('canary test', function () {
    it('should always pass', function () {
        assert(true);
    });
});

describe('module', function () {
    it('should be a function', function () {
        molarmass();
        assert(typeof molarmass === 'function');
    });
});

describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal(-1, [1, 2, 3].indexOf(5));
            assert.equal(-1, [1, 2, 3].indexOf(0));
        });

        it('should return the index of a value', function () {
            assert.equal(2, [1, 2, 3].indexOf(3));
            assert.equal(0, [1, 2, 3].indexOf(1));
        });
    });
});

describe('String', function () {
    describe('length', function () {
        it('should return 0 for empty string', function () {
            assert.equal(0, ''.length);
        });
    });

    describe('toString', function () {
        it('should be identical to itself', function () {
            var s = "hello world";
            assert(s === s.toString());
        });
    });

    describe('someFunction', function () {
        it('is not yet implemented');
    });
});
