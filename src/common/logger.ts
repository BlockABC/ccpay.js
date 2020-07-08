import {
  getLogger,
  Logger
} from 'loglevel'
const logger = getLogger('CCPay')
logger.setLevel('debug')

export {
  logger
}

// export const logger = console as any as Logger
