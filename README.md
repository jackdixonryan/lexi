# Lexey

Helper Function for Building Better Fictional Languages.

[![Version](https://badge.fury.io/gh/tterb%2FHyde.svg)](https://badge.fury.io/gh/tterb%2FHyde)
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