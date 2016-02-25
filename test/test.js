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
        assert.equal(0, mass);
    });

    it('should return the same values for tests in test-compound.js', function () {
        assert.equal(1.00794, molarmass('H'));
        assert.equal(17.00734, molarmass('OH'));
        assert.equal(2.01588, molarmass('H2'));
        assert.equal(256.52, molarmass('(S8)'));
        assert.equal(18.01528, molarmass('H2O'));
        assert.equal(342.29648, molarmass('C12H22O11'));
        assert.equal(180.15588, molarmass('H(CO)(CHOH)5H'));
        assert.equal(22.98977, molarmass('Na'));
        assert.equal(39.99711, molarmass('NaOH'));
        assert.equal(215.988, molarmass('Cr2O7'));
        assert.equal(74.09268, molarmass('Ca(OH)2'));
        assert.equal(262.857722, molarmass('Mg3(PO4)2'));
        assert.equal(6827.73, molarmass('((((Pt)7)5))'));
        assert.equal(159.6882, molarmass('(Fe2)O3'));
        assert.equal(0, molarmass('H0'));
        assert.equal(0, molarmass('(OH)0'));
    });

    it('should return an instance of Compound when the options is set', function () {
      var table = require('../lib/table');

      var OH = molarmass('OH', { returnCompound: true });
      var H = table.get('H');
      var O = table.get('O');

      assert.deepEqual(H, OH.elements[0].element);
      assert.equal(1, OH.elements[1].quantity);

      assert.deepEqual(O, OH.elements[1].element);
      assert.equal(1, OH.elements[0].quantity);

      assert.equal(17.00734, OH.molarMass);
    })
});

describe('periodic table', function () {
    var table = require('../lib/table');

    it('should be required without errors', function () {
        assert(true);
    });

    describe('#size', function () {
        it('should be 112 after the table is loaded', function () {
            assert.equal(112, table.size);
        });
    });

    describe('#get', function () {
      it('should have Hydrogen as the first element', function () {
          var H = table.get('H');

          assert.equal(H.name, 'Hydrogen');
          assert.equal(H.symbol, 'H');
          assert.equal(H.atomicNumber, '1');
          assert.equal(H.mass, 1.00794);
      });

      it('should have Gold as the 79th element', function () {
        var Au = table.get('Au');

        assert.equal(Au.name, 'Gold');
        assert.equal(Au.symbol, 'Au');
        assert.equal(Au.atomicNumber, '79');
        assert.equal(Au.mass, 196.96655);
      });
    });
});

describe('compound', function () {
    var Compound = require('../lib/compound');

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
