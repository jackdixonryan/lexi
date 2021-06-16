"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLexicon = void 0;
var lexi_1 = __importDefault(require("./lexi"));
function createLexicon(options) {
    return new lexi_1.default(options);
}
exports.createLexicon = createLexicon;
