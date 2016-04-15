# Molar Mass

Demonstration of the [molarmass package](https://www.npmjs.com/package/molarmass) in a web application at http://tntran09.github.io/molarmass

##### Technologies
React, PureCss, Flux, Browserify

## Contributing
### Install

```
npm install -g electron-prebuilt watchify browserify
npm install --production
```

### Build
1) Bundle scripts
```
npm run watchify
```
2) Run electron
```
npm start
```

### Examples

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
```

## License

[ISC License](http://www.isc.org/downloads/software-support-policy/isc-license/) © Toan Tran
