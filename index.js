'use strict';

// Load Periodic Table
var Compound = require('./compound');

module.exports = function (formula) {
    var c = new Compound(formula);
    return c.molarMass;
};
// Usage
// molarmass('H2O') = 18.0158;
// molarmass('C2H4O2') = 60.0536
