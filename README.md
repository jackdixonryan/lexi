# Lexey

Helper Function for Building Better Fictional Languages.

[![NPM Version](https://badge.fury.io/js/lexey.svg)]()
[![NPM Downloads](https://img.shields.io/npm/dt/lexey.svg?style=flat)]()  
[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)
[![GitHub contributors](https://img.shields.io/github/contributors/jackdixonryan/lexi.svg)](https://GitHub.com/jackdixonryan/lexi/graphs/contributors/)

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