import { createLexicon } from "../src/index";

const lexicon = createLexicon({
  lexicon: [{
    word: "mellon",
    definition: "friend"
  }]
});

const definitions = lexicon.define(["mellon", "Belloc"]);
console.log({ definitions });

