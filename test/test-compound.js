'use strict';

var assert = require('assert');
var table = require('../table');
var Compound = require('../compound');

describe('compound', function () {
    describe('validation of parentheses', function () {
        it('should throw for unbalanced parentheses', function () {
            assert.throws(function () { new Compound('((A'); });
            assert.throws(function () { new Compound('A))'); });
            assert.throws(function () { new Compound('((A)B)C)'); });
            assert.throws(function () { new Compound('(A)B)'); });
            assert.throws(function () { new Compound('(A)(B'); });
        });

        it('should not throw for balanced parentheses', function () {
            assert.doesNotThrow(function () { new Compound('(A)'); });
        });
    })

    describe('valid compounds', function () {
        it('should parse H', function () {
            var Hydrogen = {
                name: 'Hydrogen',
                symbol: 'H',
                atomicNumber: 1,
                mass: 1.0079
            };
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

        it('should parse NH4OH', function () {
            var NH4OH = new Compound('NH4OH');

            var H = table.get('H');
            var N = table.get('N');
            var O = table.get('O');

            assert.deepEqual(H, NH4OH.elements[0].element);
            assert.equal(5, NH4OH.elements[0].quantity);

            assert.deepEqual(N, NH4OH.elements[1].element);
            assert.equal(1, NH4OH.elements[1].quantity);

            assert.deepEqual(O, NH4OH.elements[2].element);
            assert.equal(1, NH4OH.elements[2].quantity);

            assert.equal(35.0465, NH4OH.molarMass);
        });

        it('should parse H(CO)(CHOH)5H', function () {
          var cmpd = new Compound('H(CO)(CHOH)5H');

          var H = table.get('H');
          var C = table.get('C');
          var O = table.get('O');

          assert.deepEqual(H, cmpd.elements[0].element);
          assert.equal(12, cmpd.elements[0].quantity);

          assert.deepEqual(C, cmpd.elements[1].element);
          assert.equal(6, cmpd.elements[1].quantity);

          assert.deepEqual(O, cmpd.elements[2].element);
          assert.equal(6, cmpd.elements[2].quantity);

          assert.equal(180.1608, cmpd.molarMass);
        })

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

        it('should parse Ca(OH)2', function () {
            var cmpd = new Compound('Ca(OH)2');

            var H = table.get('H');
            var O = table.get('O');
            var Ca = table.get('Ca');

            assert.deepEqual(H, cmpd.elements[0].element);
            assert.equal(2, cmpd.elements[0].quantity);

            assert.deepEqual(O, cmpd.elements[1].element);
            assert.equal(2, cmpd.elements[1].quantity);

            assert.deepEqual(Ca, cmpd.elements[2].element);
            assert.equal(1, cmpd.elements[2].quantity);

            assert.equal(74.0958, cmpd.molarMass);
        });
    });

    describe('compounds with unknown elements', function () {
        it('should ignore any unknown, yet valid, symbols', function () {
            var cmpd = new Compound('HX2');

            var H = table.get('H');
            var X = {
                name: '',
                symbol: 'X',
                atomicNumber: 0,
                mass: 0
            }

            assert.deepEqual(X, cmpd.elements[0].element);
            assert.equal(2, cmpd.elements[0].quantity);

            assert.deepEqual(H, cmpd.elements[1].element);
            assert.equal(1, cmpd.elements[1].quantity);

            assert.equal(1.0079, cmpd.molarMass);
        })
    });

    describe('invalid compounds', function () {
        describe('failures starting the compound', function () {
            it('should fail when starting with lowercase', function () {
                assert.throws(function () {
                    var c = new Compound('aCH4');
                });
            });

            it('should fail when starting with number', function () {
              assert.throws(function () {
                    var c = new Compound('95Am');
              });
            });

            it('should fail when starting with close parentheses', function () {
                assert.throws(function () {
                    var c = new Compound(')He');
                });
            });
        });

        describe('failures after lowercase', function () {
            it('should fail when followed by lowercase', function () {
                assert.throws(function () {
                    var c = new Compound('Argon');
                });
            });
        });

        describe('failures after number', function () {
            it('should fail when followed by lowercase', function () {
                assert.throws(function () {
                    var c = new Compound('C2h4o2');
                });
            });
        });

        describe('failures after open parentheses', function () {
            it('should fail when followed by lowercase');
            it('should fail when followed by number');
            it('should fail when followed by close parentheses');
            it('should fail when ending with open parentheses');
        });

        describe('failures after close parentheses', function () {
            it('should fail when followed by lowercase');
        });
    });
});
