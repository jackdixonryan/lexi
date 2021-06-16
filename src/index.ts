import Lexi from "./lexi";
import { LexiconOptions } from "./types";

export function createLexicon(options: LexiconOptions = null): Lexi {
  return new Lexi(options);
}
