'use strict';

var fs = require('fs');

function PeriodicTable() {
    var map = new Map();

    fs.readFile('table.txt', 'utf8', function (err, data) {
        if (err) {
            throw new Error('Error loading the periodic table');
        }
        else {
            var lines = data.split(/\r\n/);
            for(var i of lines) {
                var arr = i.split(/\s+/);
                var symbol = arr[1];

                map.set(symbol, {
                    name: arr[0],
                    symbol: arr[1],
                    atomicNumber: arr[2],
                    mass: arr[3]
                });
            }
        }
    });

    this.get = function (symbol) {
        return map.get(symbol);
    };

    Object.defineProperty(this, 'size', {
        get: function () { return map.size; },
        enumerable: false,
        configurable: false
    });
}

module.exports = new PeriodicTable();
