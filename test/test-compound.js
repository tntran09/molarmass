'use strict';

var assert = require('assert');
var table = require('../table');
var Compound = require('../compound');

describe('compound', function () {
    it('should throw for unbalanced parentheses', function () {
        assert.throws(function () { new Compound('((A'); });
        assert.throws(function () { new Compound('A))'); });
        assert.throws(function () { new Compound('((A)B)C)'); });
        assert.throws(function () { new Compound('(A)B)'); });
        assert.throws(function () { new Compound('(A)(B'); });
    });

    it('should not throw for balanced parentheses', function () {
        assert.doesNotThrow(function () { new Compound('(A)'); });
    })

    describe('valid compounds', function () {
        it('should parse H', function () {
            var Hydrogen = {
                name: 'Hydrogen',
                symbol: 'H',
                atomicNumber: 1,
                mass: 1.0079
            }
            var H = new Compound('H');

            assert.deepEqual(Hydrogen, H.elements[0].element);
            assert.equal(1, H.elements[0].quantity);
            assert.equal(1.0079, H.molarMass);
        });

        it('should parse OH', function () {
            var OH = new Compound('OH');
            var H = table.get('H');
            var O = table.get('O');

            assert.deepEqual(H, OH.elements[0].element);
            assert.deepEqual(O, OH.elements[1].element);
            assert.equal(1, OH.elements[0].quantity);
            assert.equal(1, OH.elements[1].quantity);
            assert.equal(17.0079, OH.molarMass);
        });

        it('should parse H2', function () {
            var H2 = new Compound('H2');
            var H = table.get('H');

            assert.deepEqual(H, H2.elements[0].element);
            assert.equal(2, H2.elements[0].quantity);
            assert.equal(2.0158, H2.molarMass);
        });

        it('should parse H2O', function () {
            var H2O = new Compound('H2O');
            var H = table.get('H');
            var O = table.get('O');

            assert.deepEqual(H, H2O.elements[0].element);
            assert.deepEqual(O, H2O.elements[1].element);
            assert.equal(2, H2O.elements[0].quantity);
            assert.equal(1, H2O.elements[1].quantity);
            assert.equal(18.0158, H2O.molarMass);
        });
    })
})
