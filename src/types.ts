export interface Entry {
  definition: string;
  word: string;
}

export interface LexiconOptions {
  lexiconRoute?: string;
  lexicon?: Entry[];
  options: {
    allowHomonym?: boolean;
    allowSynonym?: boolean;
    allowHomophone?: boolean;
  }
}