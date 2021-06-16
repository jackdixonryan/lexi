"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var double_metaphone_1 = __importDefault(require("talisman/phonetics/double-metaphone"));
var Lexi = /** @class */ (function () {
    function Lexi(configuration) {
        console.log("setting up...");
        var lexiconRoute = configuration.lexiconRoute, lexicon = configuration.lexicon, options = configuration.options;
        if (lexiconRoute) {
            this.lexiconRoute = lexiconRoute;
        }
        else {
            this.lexiconRoute = path_1.default.join(__dirname, "./lexicon.json");
        }
        if (lexicon) {
            this.lexicon = lexicon;
        }
        // options sets some of the more nuanced language features.
        if (options) {
            var allowHomonym = options.allowHomonym, allowSynonym = options.allowSynonym, allowHomophone = options.allowHomophone;
            this.allowHomonym = allowHomonym || false;
            this.allowSynonym = allowSynonym || false;
            this.allowHomophone = allowHomophone || false;
        }
        this.loadLexicon();
    }
    Lexi.prototype.loadLexicon = function () {
        if (this.lexicon) {
            fs_1.default.writeFileSync(this.lexiconRoute, JSON.stringify({ lexicon: this.lexicon }));
        }
        else {
            // don't overwrite a file if the lexicon route already has crap in it
            if (fs_1.default.existsSync(this.lexiconRoute)) {
                var existingLexicon = JSON.parse(fs_1.default.readFileSync(this.lexiconRoute, 'utf8')).lexicon;
                this.lexicon = existingLexicon;
            }
            else {
                fs_1.default.writeFileSync(this.lexiconRoute, JSON.stringify({ lexicon: [] }));
                this.lexicon = [];
            }
        }
    };
    Lexi.prototype.add = function (entry) {
        var word = entry.word, definition = entry.definition;
        word = word.toLowerCase().trim();
        definition = definition.toLowerCase().trim();
        var lexiconLength = this.lexicon.length;
        for (var i = 0; i < lexiconLength; i++) {
            var entry_1 = this.lexicon[i];
            if (entry_1.word === word) {
                if (!this.allowHomonym) {
                    return word + " already exists in the lexicon.";
                }
            }
            if (entry_1.definition === definition) {
                if (!this.allowSynonym) {
                    return definition + " is already translated as " + word + ".";
                }
            }
            // metaphone method.
            var isHomophone = this.determineIfHomophone(word, entry_1.word);
            if (isHomophone) {
                if (!this.allowHomophone) {
                    return word + " has been flagged as a homophone of " + entry_1.word;
                }
            }
        }
        // if the for loop executed without hitting an early return, we can push the word to the lexicon.
        this.lexicon.push(entry);
        fs_1.default.writeFileSync(this.lexiconRoute, JSON.stringify({ lexicon: this.lexicon }));
    };
    Lexi.prototype.determineIfHomophone = function (wordOne, wordTwo) {
        var firstDouble = double_metaphone_1.default(wordOne);
        var secondDouble = double_metaphone_1.default(wordTwo);
        // here's where we get into some issues. We need to compare each homophone in the set to each homophone
        for (var i = 0; i < firstDouble.length; i++) {
            var firstDoubleCode = firstDouble[i];
            for (var k = 0; k < secondDouble.length; k++) {
                var secondDoubleCode = secondDouble[k];
                if (firstDoubleCode === secondDoubleCode) {
                    return true;
                }
            }
        }
        return false;
    };
    return Lexi;
}());
exports.default = Lexi;
