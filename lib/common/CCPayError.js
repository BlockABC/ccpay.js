"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CCPayError = void 0;
const ts_custom_error_1 = require("ts-custom-error");
const messages = {
    1: 'Unkown error',
    10: 'Params error, missing required params ',
};
class CCPayError extends ts_custom_error_1.CustomError {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
    static fromCode(code, extendMessage = '') {
        return new CCPayError(`${CCPayError.messages[code]} ${extendMessage}`, code);
    }
}
exports.CCPayError = CCPayError;
CCPayError.messages = messages;
