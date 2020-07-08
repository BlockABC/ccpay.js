import { CustomError } from 'ts-custom-error'

const messages = {
  1: 'Unkown error',
  10: 'Params error, missing required params ',
}

export class CCPayError extends CustomError {
  protected static messages = messages
  public code: number

  constructor (message: string, code: number) {
    super(message)

    this.code = code
  }

  public static fromCode (code: keyof typeof messages, extendMessage = ''): CCPayError {
    return new CCPayError(`${CCPayError.messages[code]} ${extendMessage}`, code)
  }
}
