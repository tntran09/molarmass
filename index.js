'use strict';

var Compound = require('./compound');

module.exports = function (formula) {
    var c = new Compound(formula);
    return c.molarMass;
};
