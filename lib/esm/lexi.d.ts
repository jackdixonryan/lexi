import { Entry, LexiconOptions } from "./types";
declare class Lexi {
    lexiconRoute: string;
    lexicon: Entry[];
    allowHomonym: boolean;
    allowSynonym: boolean;
    allowHomophone: boolean;
    constructor(configuration: LexiconOptions);
    loadLexicon(): void;
    add(entry: Entry): string;
    determineIfHomophone(wordOne: string, wordTwo: string): boolean;
}
export default Lexi;
