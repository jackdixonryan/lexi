import path from "path";
import fs from "fs";
import metaphone from "talisman/phonetics/double-metaphone";
class Lexi {
    constructor(configuration) {
        console.log("setting up...");
        const { lexiconRoute, lexicon, options } = configuration;
        if (lexiconRoute) {
            this.lexiconRoute = lexiconRoute;
        }
        else {
            this.lexiconRoute = path.join(__dirname, "./lexicon.json");
        }
        if (lexicon) {
            this.lexicon = lexicon;
        }
        // options sets some of the more nuanced language features.
        if (options) {
            const { allowHomonym, allowSynonym, allowHomophone } = options;
            this.allowHomonym = allowHomonym || false;
            this.allowSynonym = allowSynonym || false;
            this.allowHomophone = allowHomophone || false;
        }
        this.loadLexicon();
    }
    loadLexicon() {
        if (this.lexicon) {
            fs.writeFileSync(this.lexiconRoute, JSON.stringify({ lexicon: this.lexicon }));
        }
        else {
            // don't overwrite a file if the lexicon route already has crap in it
            if (fs.existsSync(this.lexiconRoute)) {
                const existingLexicon = JSON.parse(fs.readFileSync(this.lexiconRoute, 'utf8')).lexicon;
                this.lexicon = existingLexicon;
            }
            else {
                fs.writeFileSync(this.lexiconRoute, JSON.stringify({ lexicon: [] }));
                this.lexicon = [];
            }
        }
    }
    add(entry) {
        let { word, definition } = entry;
        word = word.toLowerCase().trim();
        definition = definition.toLowerCase().trim();
        const lexiconLength = this.lexicon.length;
        for (let i = 0; i < lexiconLength; i++) {
            const entry = this.lexicon[i];
            if (entry.word === word) {
                if (!this.allowHomonym) {
                    return `${word} already exists in the lexicon.`;
                }
            }
            if (entry.definition === definition) {
                if (!this.allowSynonym) {
                    return `${definition} is already translated as ${word}.`;
                }
            }
            // metaphone method.
            const isHomophone = this.determineIfHomophone(word, entry.word);
            if (isHomophone) {
                if (!this.allowHomophone) {
                    return `${word} has been flagged as a homophone of ${entry.word}`;
                }
            }
        }
        // if the for loop executed without hitting an early return, we can push the word to the lexicon.
        this.lexicon.push(entry);
        fs.writeFileSync(this.lexiconRoute, JSON.stringify({ lexicon: this.lexicon }));
    }
    determineIfHomophone(wordOne, wordTwo) {
        const firstDouble = metaphone(wordOne);
        const secondDouble = metaphone(wordTwo);
        // here's where we get into some issues. We need to compare each homophone in the set to each homophone
        for (let i = 0; i < firstDouble.length; i++) {
            const firstDoubleCode = firstDouble[i];
            for (let k = 0; k < secondDouble.length; k++) {
                const secondDoubleCode = secondDouble[k];
                if (firstDoubleCode === secondDoubleCode) {
                    return true;
                }
            }
        }
        return false;
    }
}
export default Lexi;
