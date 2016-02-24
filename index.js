'use strict';

var Compound = require('./lib/compound');

module.exports = function (formula, options) {
    options = options || {};
    
    var c = new Compound(formula);
    return options.returnCompound ? c : c.molarMass;
};
