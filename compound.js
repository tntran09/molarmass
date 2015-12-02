'use strict';

var table = require('./table'); // needed to parse the formula/elements

function Compound(f, q) {
    var formula = f || '',
        molarMass = 0.0,
        quantity = q || 1,
        elements = [];


    Object.defineProperties(this, {
        'formula': {
          value: formula,
          writable: false,
          enumerable: true,
          configurable: false
        },
        'molarMass': {
          value: molarMass,
          writable: false,
          enumerable: true,
          configurable: false
        },
        'quantity': {
          value: quantity,
          writable: false,
          enumerable: true,
          configurable: false
        },
        'elements': {
          get: function () { return elements.slice(); },
          enumerable: true,
          configurable: false
        },
        'mass': {
          value: (molarMass * quantity),
          writable: false,
          enumerable: false,
          configurable: false
        }
    });
}


module.exports = Compound;
