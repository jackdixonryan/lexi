# Lexey

Helper Function for Building Better Fictional Languages.

[![NPM Version](https://img.shields.io/npm/v/npm.svg?style=flat)]()
[![NPM Downloads](https://img.shields.io/npm/dt/express.svg?style=flat)]()  
[![devDependencies Status](https://david-dm.org/tterb/Hyde/dev-status.svg)](https://david-dm.org/tterb/Hyde?type=dev)  
[![NPM Downloads][downloads-image]][downloads-url]
[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)
[![Test Coverage][coveralls-image]][coveralls-url]

```js
const lexey = require("lexey");
const lexicon = lexey({});

lexey.add({
  word: "mellon",
  definition: "friend"
});

lexey.define("mellon");
// ==> "friend"
```

## Installation