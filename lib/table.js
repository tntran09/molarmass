'use strict';

var elements = require('./elements.json');

function PeriodicTable() {
    var map = new Map();

    for (var e of elements) {
        map.set(e.symbol, e);
    }

    this.get = function (symbol) {
        return map.get(symbol);
    };

    Object.defineProperty(this, 'size', {
        value: map.size,
        writable: false,
        enumerable: false,
        configurable: false
    });
}

module.exports = new PeriodicTable();
