# Molar Mass

Test molarmass in your browser at

http://tntran09.github.io/molarmass

https://tonicdev.com/npm/molarmass

## Install

```
npm install molarmass --save
```

## Usage

```
molarmass(formula [, options]);
```
### Parameters
##### formula : string, required

The chemical formula (case-sensitive)

##### options : object, optional

Defaults to `{ }`

### Options

##### returnCompound : boolean

When set to `true`, returns an instance of the `Compound` class, which gives you access to the `formula` (string), `molarMass` (number), and `elements` (array) properties; when `false`, only the molar mass is returned as a number. Defaults to `false`.

The Compound's properties are read-only

## Examples

```js
var molarmass = require('molarmass');
console.log(molarmass('H')); // 1.00794
console.log(molarmass('OH')); // 17.00734
console.log(molarmass('H2')); // 2.01588
console.log(molarmass('(S8)')); // 256.52
console.log(molarmass('H2O')); // 18.01528
console.log(molarmass('C12H22O11')); // 342.29648
console.log(molarmass('H(CO)(CHOH)5H')); // 180.15588
console.log(molarmass('Na')); // 22.98977
console.log(molarmass('NaOH')); // 39.99711
console.log(molarmass('Cr2O7')); // 215.988
console.log(molarmass('Ca(OH)2')); // 74.09268
console.log(molarmass('Mg3(PO4)2')); // 262.857722
console.log(molarmass('((((Pt)7)5))')); // 6827.73
console.log(molarmass('(Fe2)O3')); // 159.6882
console.log(molarmass('(NH4)2Cr2O7')); // 252.06492

var c1 = molarmass('H2O', { returnCompound: true });
/*
  c1: Compound { formula: 'H2O', molarMass: 18.01528, elements: [Getter] }
  c1.elements: [
  {
    element: { name: 'Hydrogen', symbol: 'H', atomicNumber: 1, mass: 1.00794 },
    quantity: 2
  },
  {
    element: { name: 'Oxygen', symbol: 'O', atomicNumber: 8, mass: 15.9994 },
    quantity: 1
  }
]
*/
```

## License

[ISC License](http://www.isc.org/downloads/software-support-policy/isc-license/) © Toan Tran
