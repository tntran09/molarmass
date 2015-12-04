'use strict';

var table = require('./table');

function Compound(f, q) {
    var formula = f || '',
        molarMass = 0.0,
        quantity = q || 1,
        elements = [];

    validatePattern(formula);

    var symbolQuantities = parse(formula);
    elements = consolidateSymbols(symbolQuantities);
    molarMass = calculateMass(elements);

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

    function validatePattern(formula) {
        var regex = /.*/;
        if (!formula.match(regex)) {
            throw new Error('Not a valid chemical formula: ' + formula);
        }

        if (formula.length > 0) {
            var charArray = formula.split('');
            if ('we are not able to create a regex for the valid formula') {
                var validityMatrix = {
                    S: { U: true,                   O: true,          E: true },
                    U: { U: true, L: true, N: true, O: true, C: true, E: true },
                    L: { U: true,          N: true, O: true, C: true, E: true },
                    N: { U: true,          N: true, O: true, C: true, E: true },
                    O: { U: true,                   O: true                   },
                    C: { U: true,          N: true, O: true, C: true, E: true },
                    E: {                                                      }
                };

                var currentClass = 'S';
                for(var i of charArray) {
                    var nextCharClass = regexCode(i);

                    // this can probably be done in the parsing loop
                    if (validityMatrix[currentClass][nextCharClass]) {
                        currentClass = nextCharClass;
                    } else {
                        throw new Error('Not a valid chemical formula: ' + formula + ', '+ currentClass + ' followed by ' + nextCharClass);
                    }

                }

                if (!validityMatrix[currentClass]['E']) {
                    throw new Error('Not a valid chemical formula: ' + formula + ', ended with ' + currentClass);
                }
            }

            var leftParenCount  = charArray.reduce(function (count, current) { return current === '(' ? count + 1 : count; }, 0);
            var rightParenCount = charArray.reduce(function (count, current) { return current === ')' ? count + 1 : count; }, 0);

            if (leftParenCount !== rightParenCount) {
                throw new Error('Unbalanced parentheses: ' + formula + '. Left: ' + leftParenCount + ' Right: ' + rightParenCount);
            }
        }
    }

    function regexCode(char) {
        if (char.match(/^[A-Z]$/))
            return 'U';
        else if (char.match(/^[a-z]$/))
            return 'L';
        else if (char.match(/^[0-9]$/))
            return 'N';
        else if (char === '(')
            return 'O';
        else if (char === ')')
            return 'C';
        else
            return '?';
    }

    function parse(formula) {
        var listOfElements = []
        var charArray = formula.split('');
        var currentSymbol = '';
        var currentQuantity = '';
        var ch = '';
        var i = 0;

        while (i < charArray.length) {
            ch = charArray[i];

            if (ch.match(/[0-9]/)) {
                currentQuantity += ch;
            }
            else if (ch.match(/[A-Z]/)) {
                listOfElements = addElementToList(listOfElements, currentSymbol, parseInt(currentQuantity));
                currentSymbol = ch;
                currentQuantity = '';
            }
            else if (ch.match(/[a-z]/)) {
                currentSymbol += ch;
            }
            else if (ch.match(/\(/)) {
                var oParen = formula.indexOf('(', i);
                var cParen = formula.indexOf(')', i);
                i = cParen + 1;

                var groupQuantityLen = 0;
                while (i < charArray.length && charArray[i].match(/[0-9]/)) {
                    groupQuantityLen++;
                    i++;
                }

                var groupQuantity = parseInt(formula.substr(cParen + 1, groupQuantityLen));
                var nestedElements = parse(formula.substr(oParen + 1, cParen - (oParen + 1)));
                listOfElements = addCompoundToList(listOfElements, nestedElements, groupQuantity);
                i--;
            }

            i++;
        }

        listOfElements = addElementToList(listOfElements, currentSymbol, parseInt(currentQuantity));

        return listOfElements;

        function addElementToList (list, symbol, quantity) {
            if (symbol) {
                quantity = quantity || 1;
                if (list[symbol]) {
                    list[symbol] = list[symbol] + quantity;
                }
                else {
                    list[symbol] = quantity;
                }
            }

            return list;
        }

        function addCompoundToList (list, compound, quantity) {
            for(var symbol in compound.elements) {
                if (list[symbol]) {
                    list[symbol] = list[symbol] + (quantity * compound.elements[symbol]);
                }
                else {
                    list[symbol] = compound.elements[symbol] * quantity;
                }
            }

            return list;
        }
    }

    function consolidateSymbols(symbolQuantities) {
        var elements = [];

        for(var s in symbolQuantities) {
            var hasExistingElement = false;

            for(var i = 0; i < elements.length && !hasExistingElement; i++) {
                if (elements[i].element.symbol === s) {
                    elements[i].element.quantity += symbolQuantities[s];
                    hasExistingElement = true;
                }
            }

            if (!hasExistingElement) {
                var e = table.get(s);
                if (e) {
                    elements.push({
                        element: e,
                        quantity: symbolQuantities[s]
                    });
                }
                else {
                    elements.push({
                        element: {
                            name: '',
                            symbol: s,
                            atomicNumber: 0,
                            mass: 0.0
                        },
                        quantity: symbolQuantities[s]
                  });
                }
            }
        }

        elements.sort(function compareCompound(a, b) {
            return a.element.atomicNumber - b.element.atomicNumber
        });

        return elements;
    }

    function calculateMass(elements) {
        var totalMass = 0.0;

        for(var e of elements) {
            totalMass += e.element.mass * e.quantity;
        }

        return totalMass;
    }
}


module.exports = Compound;
