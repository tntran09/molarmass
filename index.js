'use strict';

var Compound = require('./lib/compound');

module.exports = function (formula) {
    // considering adding optional parameter to list to return the compound rather than just the mass
    var c = new Compound(formula);
    return c.molarMass;
};
