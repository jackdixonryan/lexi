import Lexi from "./lexi";
import { LexiconOptions } from "./types";

exports.lexi = function (options: LexiconOptions) {
  return new Lexi(options);
}

