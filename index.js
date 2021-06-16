const fs = require("fs");
const path = require("path");
const metaphone = require("talisman/phonetics/metaphone");
const fuse = require("fuse.js");

// the lexicographer is pretty simple at first: 
// take a word 
// see if the word already exists
// if not, take a meaning. 
// save the word + meaning to a JSON file. 
// words should have no spaces allowed. 
// random method can create a random meaning string. 

// further on : try to interpret meaning strings into composite meanings


const lexi = (function module() {
  "use strict";

  const syllableRegex = /[^aeiouy]*[aeiouy]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouy]))?/gi;
  // this could make things cool.
  function syllabify(words) {
    return words.match(syllableRegex);
  }
  const jsonFilepath = path.join(__dirname, "./lexicon.json");

  // retrieves the JSON based lexicon. 
  function retrieveLexicon() {
    const exists = fs.existsSync(jsonFilepath);
    if (exists) {
      const lexiconFile = fs.readFileSync(jsonFilepath);
      const { lexicon } = JSON.parse(lexiconFile);
      return lexicon;
    } else {
      fs.writeFileSync(jsonFilepath, JSON.stringify({ lexicon: [] }));
      return [];
    }
  }

  let index;
  function buildIndex(lexicon) {
    index = new fuse(lexicon, { keys: ['word'], includeScore: true });
  } 

  function force(method) {
    console.log("force just got called.", method);
  }

  return {
    // preload the lexi module with an existing lexicon of stringified JSON
    addLexicon(lexicon) {
      fs.writeFileSync(jsonFilepath, lexicon);
    },
    addWord(options) {
      const { word, definition } = options;
      const lexicon = retrieveLexicon();
      const cleanedWord = word.toLowerCase().trim();
      const cleanedDefinition = definition.toLowerCase().trim();
      for (let i = 0; i < lexicon.length; i++) {
        const entry = lexicon[i];
        if (entry.word === cleanedWord) {
          console.log(`Word ${word} is already defined as: ${entry.definition}`);
          // this should trigger the force callback as well, since sometimes words have variant meanings. 
          return force;
        }

        if (entry.definition === cleanedDefinition) {
          console.log(`${definition} is already used by the word ${entry.word}`);
          return force;
          // this should not throw an error but trigger the force callback function, since sometimes synonyms exist.
        }
        // using metaphone to run a quick --see if it sounds similar-- check, albeit this will be based on english pronunciation.
        const metaWord = metaphone(cleanedWord);
        const metaEntryWord = metaphone(entry.word);
        if (metaWord === metaEntryWord) {
          console.log(`${cleanedWord} may be phonetically similar to ${entry.word}. Are you sure you want to save it?`);
          return force;
          // this should trigger the force callback since sometimes homonyms exist. 
        }
      };
      // no words or definitions matched perfectly, so we add the new entry. 
      lexicon.push({ word: cleanedWord, definition: cleanedDefinition });
      fs.writeFileSync(jsonFilepath, JSON.stringify({ lexicon }));
    },
    removeWord(word) { },
    compareWord(word) { },
    define(words) {
      const lexicon = retrieveLexicon();
      words.forEach((word) => {
        const found = lexicon.find((entry) => entry.word === word);
        if (found) {
          console.log({ word, definition: found.definition });
        } else {
          console.log(`${word} does not have a definition yet.`);
        }
      })
    },
    search(definitions) {
      const lexicon = retrieveLexicon();
      definitions.forEach((definition) => {
        const found = lexicon.find((entry) => entry.definition === definition);
        if (found) {
          console.log(found.word);;
        } else {
          console.log(`No entries found with definition: ${definition}`);
        }
      });
    },
    randomString() { },
    deconstruct(word) {
      const lexicon = retrieveLexicon();
      if (!index) buildIndex(lexicon);
      const syllables = syllabify(word);
      console.log("Module parsed syllables as ", syllables.join("-"));
      const construedMeaning = [];
      // it ain't quite right but it might be interesting to play with.
      for (let i = 0; i < syllables.length; i++) {
        const syllable = syllables[i];
        const closeEnoughResults = index.search(syllable);
        if (closeEnoughResults.length > 0) {
          const topHit = closeEnoughResults[0];
          if (topHit.score < 0.6) {
            construedMeaning.push(closeEnoughResults[0].item.definition);
          } else {
            construedMeaning.push("?");
          }
        } else {
          construedMeaning.push("?");
        }
      }
      return construedMeaning.join(" ");
    },
    construct(meaning) { },
  }
  
})();

module.exports = lexi;