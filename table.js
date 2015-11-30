'use strict';

let fs = require('fs');

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
                    atomicNumber: arr[2],
                    symbol: arr[1],
                    name: arr[0],
                    mass: arr[3]
                });
            }
        }
    });

    this.get = function (symbol) {
        return map[symbol];
    }

    Object.defineProperty(this, 'size', {
        get: function () {
            return map.size;
        }
    });
}

module.exports = new PeriodicTable();
