"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isString = exports.isUndefined = exports.isNil = exports.isObject = void 0;
const isObject = (fn) => !(0, exports.isNil)(fn) && typeof fn === "object";
exports.isObject = isObject;
const isNil = (val) => (0, exports.isUndefined)(val) || val === null;
exports.isNil = isNil;
const isUndefined = (obj) => typeof obj === "undefined";
exports.isUndefined = isUndefined;
const isString = (val) => typeof val === "string";
exports.isString = isString;
//# sourceMappingURL=utils.js.map