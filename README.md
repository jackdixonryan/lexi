# Lexey

Helper Function for Building Better Fictional Languages.

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Linux Build][travis-image]][travis-url]
[![Windows Build][appveyor-image]][appveyor-url]
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