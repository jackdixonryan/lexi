import Lexi from "./lexi";
import { LexiconOptions } from "./types";

export function createLexicon(options: LexiconOptions): Lexi {
  return new Lexi(options);
}
