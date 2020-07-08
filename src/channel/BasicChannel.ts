import { EventEmitter } from 'eventemitter3'
import { logger } from '../common/logger'
import { isRpcRequest, JsonRpcEvent, JsonRpcRequest } from './JsonRpc'

export interface JsonRpcRequestHolder {
  resolve: Function,
  reject: Function,
  payload: JsonRpcRequest,
  createdAt: Date,
}

export abstract class BasicChannel extends EventEmitter {
  abstract postMessage(rpc: JsonRpcRequest | JsonRpcEvent): void

  responsePromiseHolder: {[key: string]: JsonRpcRequestHolder} = {}

  request (payload: Partial<JsonRpcRequest | JsonRpcEvent>) {
    return new Promise((resolve, reject): void => {
      const rpc = Object.assign({ jsonrpc: '2.0' }, payload) as JsonRpcRequest

      if (isRpcRequest(rpc)) {
        logger.debug('BasicChannel.request add promise: ', rpc.id)
        this.responsePromiseHolder[rpc.id] = {
          resolve,
          reject,
          payload: rpc,
          createdAt: new Date()
        }
      }

      logger.debug('BasicChannel.request send message:', rpc)

      this.postMessage(rpc)
    })
  }
}
