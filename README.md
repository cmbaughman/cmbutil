# cmbutil

[![npm (scoped)](https://img.shields.io/npm/v/cmbutil)](https://www.npmjs.com/package/cmbutil)
[![GitHub issues](https://img.shields.io/github/issues/cmbaughman/cmbutil)](https://github.com/cmbaughman/cmbutil/issues)
[![GitHub license](https://img.shields.io/github/license/cmbaughman/cmbutil)](https://github.com/cmbaughman/cmbutil/blob/main/LICENSE)

A small set of useful vanilla Javascript utilities you can use in anything.

## Install

```
npm install cmbutil --save
```

## Usage

```javascript
import cmbutil from 'cmbutil';

const num = 123;
if (cmbutil.isNumeric(num)) {
  console.log(`${num} is numeric`);
}

const myString = "hello world!";
const properCasedString = cmbutil.properCase(myString);
console.log(properCasedString);
```


## Build from source

Clone repository: `git clone https://github.com/cmbaughman/cmbutil.git`

Clone with `gh`: `gh repo clone cmbaughman/cmbutil`

## Generate documentation

This project uses `jsdoc` for documentation. To regenerate the documentation, (be
sure to use jsdoc syntax), use the following command:

```
npm run docs
```
