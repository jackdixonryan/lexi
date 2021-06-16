# Lexey

Helper Function for Building Better Fictional Languages.

[![NPM Version](https://badge.fury.io/js/lexey.svg)]()
[![NPM Downloads](https://img.shields.io/npm/dt/lexey.svg?style=flat)]()  
[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)
[![GitHub contributors](https://img.shields.io/github/contributors/jackdixonryan/lexi.svg)](https://GitHub.com/jackdixonryan/lexi/graphs/contributors/)

```js
const lexey = require("lexey");
const lexicon = lexey.createLexicon({});

lexey.add({
  word: "mellon",
  definition: "friend"
});

lexey.define("mellon");
// ==> "friend"
```

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 0.10 or higher is required.

If this is a brand new project, make sure to create a `package.json` first with
the [`npm init` command](https://docs.npmjs.com/creating-a-package-json-file).

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install lexey
```

Follow [our installing guide](http://expressjs.com/en/starter/installing.html)
for more information. 

## Features

  * Easy persisting and retrieval
  * Synonym/Homonym settings for custom builds
  * Operates with existing JSON lexicon documents
  * Syllabic parsing
  * NLP Homophone Detection courtesy of [Talisman](https://github.com/Yomguithereal/talisman)
