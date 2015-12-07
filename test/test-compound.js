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
            assert.equal(2, H2O.elements[0].quantity);

            assert.deepEqual(O, H2O.elements[1].element);
            assert.equal(1, H2O.elements[1].quantity);

            assert.equal(18.0158, H2O.molarMass);
        });

        it('should parse C2H4O2', function () {
            var C2H4O2 = new Compound('C2H4O2');

            var H = table.get('H');
            var C = table.get('C');
            var O = table.get('O');

            assert.deepEqual(H, C2H4O2.elements[0].element);
            assert.equal(4, C2H4O2.elements[0].quantity);

            assert.deepEqual(C, C2H4O2.elements[1].element);
            assert.equal(2, C2H4O2.elements[1].quantity);

            assert.deepEqual(O, C2H4O2.elements[2].element);
            assert.equal(2, C2H4O2.elements[2].quantity);

            assert.equal(60.0536, C2H4O2.molarMass);
        });

        it('should parse C12H22O11', function () {
            var C12H22O11 = new Compound('C12H22O11');

            var H = table.get('H');
            var C = table.get('C');
            var O = table.get('O');

            assert.deepEqual(H, C12H22O11.elements[0].element);
            assert.equal(22, C12H22O11.elements[0].quantity);

            assert.deepEqual(C, C12H22O11.elements[1].element);
            assert.equal(12, C12H22O11.elements[1].quantity);

            assert.deepEqual(O, C12H22O11.elements[2].element);
            assert.equal(11, C12H22O11.elements[2].quantity);

            assert.equal(342.3058, C12H22O11.molarMass);
        });

        it('should parse Na', function () {
            var Sodium = {
                name: 'Sodium',
                symbol: 'Na',
                atomicNumber: 11,
                mass: 22.99
            };

            var Na = new Compound('Na');

            assert.deepEqual(Sodium, Na.elements[0].element);
            assert.equal(1, Na.elements[0].quantity);
            assert.equal(22.99, Na.molarMass);
        });

        it('should parse NaOH', function () {
            var NaOH = new Compound('NaOH');

            var H = table.get('H');
            var O = table.get('O');
            var Na = table.get('Na');

            assert.deepEqual(H, NaOH.elements[0].element);
            assert.equal(1, NaOH.elements[0].quantity);

            assert.deepEqual(O, NaOH.elements[1].element);
            assert.equal(1, NaOH.elements[1].quantity);

            assert.deepEqual(Na, NaOH.elements[2].element);
            assert.equal(1, NaOH.elements[2].quantity);

            assert.equal(39.9979, NaOH.molarMass);
        });

        it('should parse Cr2O7', function () {
            var Cr2O7 = new Compound('Cr2O7');

            var O = table.get('O');
            var Cr = table.get('Cr');

            assert.deepEqual(O, Cr2O7.elements[0].element);
            assert.equal(7, Cr2O7.elements[0].quantity);

            assert.deepEqual(Cr, Cr2O7.elements[1].element);
            assert.equal(2, Cr2O7.elements[1].quantity);

            assert.equal(216.0, Cr2O7.molarMass);
        });

        it('should parse Ca(OH)2');
    })
})
