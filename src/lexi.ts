import path from "path";
import fs from "fs";
import metaphone from "talisman/phonetics/double-metaphone";
import { Entry, LexiconOptions } from "./types";

class Lexi {
  lexicon: Entry[];
  allowHomonym: boolean;
  allowSynonym: boolean;
  allowHomophone: boolean;

  // configuration is now optional.
  constructor(configuration: LexiconOptions = null) {
    console.log("setting up...");

    if (configuration) {
      const {
        lexicon,
        options
      } = configuration;

      // preload a lexicon array.
      if (lexicon) {
        this.lexicon = lexicon;
      } 

      // options sets some of the more nuanced language features.
      if (options) {
        const {
          allowHomonym,
          allowSynonym,
          allowHomophone
        } = options;

        this.allowHomonym = allowHomonym || false;
        this.allowSynonym = allowSynonym || false;
        this.allowHomophone = allowHomophone || false;
      }
    }
    if (!this.lexicon) this.lexicon = [];
    console.log(`Lexicon successfully constructed with ${this.lexicon.length} entries.`);
  }

  add(entry: Entry): Entry {
    let { word, definition } = entry;
    word = word.toLowerCase().trim();
    definition = definition.toLowerCase().trim();
    const lexiconLength: number = this.lexicon.length;
    for (let i = 0; i < lexiconLength; i++) {
      const entry = this.lexicon[i];
      if (entry.word === word) {
        if (!this.allowHomonym) {
          console.error(`${word} already exists in the lexicon.`);
        }
      }
      if (entry.definition === definition) {
        if (!this.allowSynonym) {
          console.error(`${definition} is already translated as ${word}.`);
        }
      }
       
      // metaphone method.
      const isHomophone: boolean = this.determineIfHomophone(word, entry.word);
      if (isHomophone) {
        if (!this.allowHomophone) {
          console.error(`${word} has been flagged as a homophone of ${entry.word}`);
        } 
      }
    }
    // if the for loop executed without hitting an early return, we can push the word to the lexicon.
    this.lexicon.push(entry);
    // for chaining. 
    return entry;
  }

  define(words: string[]): Entry[]{
    const definitions: Entry[] = words.map((word: string) => {
      const entry: Entry | undefined = this.lexicon.find((entry: Entry) => entry.word === word);
      if (entry) {
        return entry as Entry;
      } else {
        return { word, definition: "undefined" };
      }
    });

    return definitions;
  }

  // on the GET function, add some options for filtering / optional retrievals 
  get(options) {
    return this.lexicon;
  }


  determineIfHomophone(wordOne: string, wordTwo: string): boolean {
    const firstDouble = metaphone(wordOne);
    const secondDouble = metaphone(wordTwo);

    // here's where we get into some issues. We need to compare each homophone in the set to each homophone
    for (let i = 0; i < firstDouble.length; i++) {
      const firstDoubleCode: string = firstDouble[i];
      for (let k = 0; k < secondDouble.length; k++) {
        const secondDoubleCode: string = secondDouble[k];
        if (firstDoubleCode === secondDoubleCode) {
          return true;
        }
      }
    }
    return false;
  }
}
 
export default Lexi;