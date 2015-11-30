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

describe('molarmass', function () {
    it('should return 0 on empty string', function() {
        var mass = molarmass('');
        assert.strictEqual(0, mass);
    });
});

describe('periodic table', function () {
    var table = require('../table');

    it('should be required without errors', function () {
        assert(true);
    });

    describe('#size', function () {
        it('should be 109 after the table is loaded', function () {
            assert.equal(109, table.size);
        });
    });

    describe('#get', function () {
      it('should have Hydrogen as the first element');
      it('should have Gold as the 79th element');
    });
});
