const lexey = require("lexey");
const lexicon = lexey.createLexicon({
  lexiconRoute: "./lexicon.json"
});

const word = lexicon.add({
  word: "mellon",
  definition: "friend"
});

console.log(lexicon.define("mellon"));
