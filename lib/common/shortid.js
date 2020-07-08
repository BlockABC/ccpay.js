"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shortid = void 0;
let uuid = 1;
function shortid(prefix = '') {
    return `${prefix}_${++uuid}`;
}
exports.shortid = shortid;
