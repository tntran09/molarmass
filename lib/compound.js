'use strict';

var table = require('./table');

function Compound(f) {
  var formula = f || '',
    molarMass = 0.0,
    elements = [];

  var strippedFormulas = formula.replace(/[\.\-\s=_]/g, '').split('+');

  molarMass = strippedFormulas.reduce( function(prev, current) {
    var wrong = current.match(/^(\d+)[(]*([A-z0-9]+)[)]*$/);
    if (wrong) {
      current = `(${wrong[2]})${wrong[1]}`;
    }

    validatePattern(current);

    var symbolQuantities = parse(current);
    var currentElements = consolidateSymbols(symbolQuantities);
    var result  = calculateMass(currentElements);
    result = Math.round(result * 1000000) / 1000000;

    elements = elements.concat(currentElements);

    return prev + result;
  }, 0);

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
        L: { U: true, L: true, N: true, O: true, C: true, E: true },
        N: { U: true,          N: true, O: true, C: true, E: true },
        O: { U: true,                   O: true,                  },
        C: { U: true,          N: true, O: true, C: true, E: true },
        E: {                                                      }
    };
    var currentClass = 'S', nextCharClass = '?';
    var charArray = formula.split('');

    if (charArray.length > 0) {
        for (var i = 0; i < charArray.length; i++) {
            nextCharClass = regexCode(charArray[i]);

            // this can probably be done in the parsing loop
            if (validityMatrix[currentClass][nextCharClass]) {
                currentClass = nextCharClass;
            }
            else if (nextCharClass === '?') {
                throw new Error('Invalid character in a chemical formula: ' + charArray[i]);
            }
            else {
                var baseMessage = 'Not a valid chemical formula: ';

                if(currentClass === 'S') {
                  baseMessage += 'Cannot begin with ' + nameOfCharClass(nextCharClass);
                }
                else {
                  baseMessage += nameOfCharClass(currentClass) + ' followed by ' + nameOfCharClass(nextCharClass);
                }

                throw new Error(baseMessage);
            }
        }

        if (!validityMatrix[currentClass]['E']) {
            throw new Error('Not a valid chemical formula: ended with ' + nameOfCharClass(currentClass));
        }

        var leftParenCount  = charArray.reduce(function (count, current) { return current === '(' ? count + 1 : count; }, 0);
        var rightParenCount = charArray.reduce(function (count, current) { return current === ')' ? count + 1 : count; }, 0);

        if (leftParenCount !== rightParenCount) {
            throw new Error('Unbalanced parentheses: ' + formula);
        }
    }
}

function nameOfCharClass(char) {
    switch(char) {
      case 'S': return 'start';
      case 'U': return 'uppercase';
      case 'L': return 'lowercase';
      case 'N': return 'number';
      case 'O': return 'open parenthases';
      case 'C': return 'close parenthases';
      case 'E': return 'end';
      default: return 'unknown';
    }
}

function regexCode(char) {
    if (char.match(/^[A-Z]$/))
        return 'U';
    else if (char.match(/^[a-z]$/))
        return 'L';
    else if (char.match(/^[0-9]$/))
        return 'N';
    else if (char === '(' || char === '[')
        return 'O';
    else if (char === ')' || char === ']')
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
    var charClass = '';
    var i = 0;

    while (i < charArray.length) {
        ch = charArray[i];
        charClass = regexCode(ch);

        if (charClass === 'N') {
            currentQuantity += ch;
        }
        else if (charClass === 'U') {
            symbolsCollection = addElementToList(symbolsCollection, currentSymbol, currentQuantity);
            currentSymbol = ch;
            currentQuantity = '';
        }
        else if (charClass === 'L') {
            currentSymbol += ch;
        }
        else if (charClass === 'O') {
            var oParen = i;
            var cParen = findMatchingParentheses(formula, i);
            i = cParen + 1;

            var groupQuantity = '';
            while (i < charArray.length && charArray[i].match(/[0-9]/)) {
                groupQuantity += charArray[i];
                i += 1;
            }

            var nestedSymbols = parse(formula.substr(oParen + 1, cParen - (oParen + 1)));
            symbolsCollection = addCompoundToList(symbolsCollection, nestedSymbols, groupQuantity);
            i -= 1;
        }

        i += 1;
    }

    symbolsCollection = addElementToList(symbolsCollection, currentSymbol, currentQuantity);

    return symbolsCollection;
}

function findMatchingParentheses(str, index) {
    var openCount = 0;
    while (index < str.length) {
        if (str[index] === ')' || str[index] === ']') {
            if (openCount === 1) {
                break;
            }
            else {
                openCount -= 1;
            }
        }
        else if (str[index] === '(' || str[index] === '[') {
            openCount += 1;
        }

        index += 1
    }

    return index;
}

function addElementToList (list, symbol, quantityStr) {
    if (symbol) {
        var quantity = parseInt(quantityStr || '1');
        if (list[symbol]) {
            list[symbol] = list[symbol] + quantity;
        }
        else {
            list[symbol] = quantity;
        }
    }

    return list;
}

function addCompoundToList (list, symbols, quantityStr) {
    var quantity = parseInt(quantityStr || '1');
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

    for(var i = 0; i < elements.length; i++) {
        var e = elements[i];
        totalMass += e.element.mass * e.quantity;
    }

    return totalMass;
}


module.exports = Compound;
