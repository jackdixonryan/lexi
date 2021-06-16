"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lexi_1 = __importDefault(require("./lexi"));
exports.lexi = function (options) {
    return new lexi_1.default(options);
};
