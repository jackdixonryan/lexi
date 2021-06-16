
const lexi = require("./index");


const wordAdd = lexi.addWord({
  word: "laz",
  definition: "cave"
});

console.log(wordAdd);
wordAdd("synonym");


// lexi.define(['kair', 'nair', 'lair']);
// lexi.search(['leader']);
console.log("Possible Meaning:", lexi.deconstruct("kairimandros"));
console.log("Possible Meaning", lexi.deconstruct("rosjan"));

