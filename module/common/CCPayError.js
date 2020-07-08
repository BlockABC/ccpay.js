import { CustomError } from 'ts-custom-error';
const messages = {
    1: 'Unkown error',
    10: 'Params error, missing required params ',
};
export class CCPayError extends CustomError {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
    static fromCode(code, extendMessage = '') {
        return new CCPayError(`${CCPayError.messages[code]} ${extendMessage}`, code);
    }
}
CCPayError.messages = messages;
