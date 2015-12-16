'use strict';

var table = require('./table');

function Compound(f) {
    var formula = f || '',
        molarMass = 0.0,
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
        'elements': {
            get: function () { return elements.slice(); },
            enumerable: true,
            configurable: false
        }
    });
}

function validatePattern(formula) {
    var validityMatrix = {
        S: { U: true,                   O: true,          E: true },
        U: { U: true, L: true, N: true, O: true, C: true, E: true },
        L: { U: true,          N: true, O: true, C: true, E: true },
        N: { U: true,          N: true, O: true, C: true, E: true },
        O: { U: true,                   O: true                   },
        C: { U: true,          N: true, O: true, C: true, E: true },
        E: {                                                      }
    };
    var currentClass = 'S', nextCharClass = '?';
    var charArray = formula.split('');

    if (charArray.length > 0) {
        for (var i of charArray) {
            nextCharClass = regexCode(i);

            // this can probably be done in the parsing loop
            if (validityMatrix[currentClass][nextCharClass]) {
                currentClass = nextCharClass;
            }
            else if (nextCharClass === '?') {
                throw new Error('Invalid character in a chemical formula: ' + i);
            }
            else {
                throw new Error('Not a valid chemical formula: ' + formula + ', ' + currentClass + ' followed by ' + nextCharClass);
            }
        }

        if (!validityMatrix[currentClass]['E']) {
            throw new Error('Not a valid chemical formula: ' + formula + ', ended with ' + currentClass);
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
    var symbolsCollection = {};
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
            symbolsCollection = addElementToList(symbolsCollection, currentSymbol, parseInt(currentQuantity));
            currentSymbol = ch;
            currentQuantity = '';
        }
        else if (ch.match(/[a-z]/)) {
            currentSymbol += ch;
        }
        else if (ch.match(/\(/)) {
            var oParen = i;
            var cParen = findMatchingParentheses(formula, i);
            i = cParen + 1;

            var groupQuantityString = '';
            while (i < charArray.length && charArray[i].match(/[0-9]/)) {
                groupQuantityString += charArray[i];
                i++;
            }

            var groupQuantity = parseInt(groupQuantityString);
            var nestedSymbols = parse(formula.substr(oParen + 1, cParen - (oParen + 1)));
            symbolsCollection = addCompoundToList(symbolsCollection, nestedSymbols, groupQuantity);
            i--;
        }

        i++;
    }

    symbolsCollection = addElementToList(symbolsCollection, currentSymbol, parseInt(currentQuantity));

    return symbolsCollection;
}

function findMatchingParentheses(str, index) {
    var openCount = 0;
    while (index < str.length) {
        if (str[index] === ')') {
            if (openCount === 1) {
                break;
            }
            else {
                openCount -= 1;
            }
        }
        else if (str[index] === '(') {
            openCount += 1;
        }

        index += 1
    }

    return index;
}

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

function addCompoundToList (list, symbols, quantity) {
    quantity = quantity || 1;
    for(var symbol in symbols) {
        if (list[symbol]) {
            list[symbol] = list[symbol] + (quantity * symbols[symbol]);
        }
        else {
            list[symbol] = symbols[symbol] * quantity;
        }
    }

    return list;
}

function consolidateSymbols(symbolQuantities) {
    var elements = [];

    for(var s in symbolQuantities) {
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

    elements.sort(function compareCompound(a, b) {
        return a.element.atomicNumber - b.element.atomicNumber;
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


module.exports = Compound;
