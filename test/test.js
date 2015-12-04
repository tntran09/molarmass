'use strict';

var assert = require('assert');
var molarmass = require('../index');

describe('canary', function () {
    it('should always pass', function () {
        assert(true);
    });
});

describe('molarmass', function () {
    it('should be a function', function () {
        molarmass();
        assert(typeof molarmass === 'function');
    });

    it('should return 0 on empty string', function () {
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
      it('should have Hydrogen as the first element', function () {
          var H = table.get('H');

          assert.equal(H.name, 'Hydrogen');
          assert.equal(H.symbol, 'H');
          assert.equal(H.atomicNumber, '1');
          assert.equal(H.mass, 1.0079);
      });

      it('should have Gold as the 79th element', function () {
        var Au = table.get('Au');

        assert.equal(Au.name, 'Gold');
        assert.equal(Au.symbol, 'Au');
        assert.equal(Au.atomicNumber, '79');
        assert.equal(Au.mass, 196.97);
      });
    });
});

describe('compound', function () {
    var Compound = require('../compound');

    describe('module', function () {
        it('should be required without errors', function () {
            assert(true);
        });
    });

    describe('#constructor', function () {
        it('should be instantiated without errors', function () {
            var c = new Compound();
        });

        it('should have some default values', function () {
            var c = new Compound();

            assert.equal('', c.formula);
            assert.equal(0.0, c.molarMass);
            assert.deepEqual([], c.elements);
        });
    });

    describe('@formula', function () {
        it('should be readonly', function () {
            var c = new Compound();

            assert.throws(function () {
                    c.formula = 'something else';
                },
                /^TypeError: Cannot assign to read only property .*$/
            );

            assert.equal('', c.formula);
        });
    });

    describe('@molarMass', function () {
        it('should be readonly', function () {
            var c = new Compound();

            assert.throws(
                function () { c.molarMass = -100; },
                /^TypeError: Cannot assign to read only property .*$/
            );

            assert.equal(0.0, c.molarMass);
        });
    });

    describe('@elements', function () {
        it('should be readonly', function () {
            var c = new Compound();

            assert.throws(
                function () { c.elements = ['some', 'new', 'elements']; },
                /^TypeError: Cannot set property .* which has only a getter$/
            );

            assert.doesNotThrow(
                function () { c.elements.push('some', 'new', 'elements');
            });

            assert.deepEqual([], c.elements);
        });
    });
});
