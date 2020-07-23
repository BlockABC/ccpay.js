import { Logger } from 'loglevel'

import { Env } from '../common/Env'
import { logger } from '../common/logger'
import { BasicChannel } from './BasicChannel'
import {
  isRpcEvent,
  JsonRpcResponse, JsonRpcEvent, isRpcResponse, JsonRpcRequest,
} from './JsonRpc'

export interface IChannel {
  postMessage: (data: string | any) => void,
}

// inject noop global channel
if (typeof window !== 'undefined') {
  window.CCPayNativeClientCallJS = () => null
}

/**
 * Native Channel
 */
export class NativeChannel extends BasicChannel implements IChannel {
  public env: Env
  public requestChannel: string

  constructor (requestChannel: string, logger: Logger, env: Env) {
    super()

    this.requestChannel = requestChannel
    this.env = env

    // replace global callback channel
    window.CCPayNativeClientCallJS = this.CCPayNativeClientCallJS.bind(this)
  }

  /**
   * 将数据类型统一为 string
   */
  _dataToString (data: any) {
    return JSON.stringify(data)
  }

  postMessage (data: JsonRpcRequest | JsonRpcEvent): void {
    const requestChannel = this.requestChannel

    if (this.env.isIOS) {
      logger.debug(`NativeChannel send to ios ${requestChannel}`)

      if (window.webkit?.messageHandlers?.[requestChannel]?.postMessage) {
        window.webkit.messageHandlers[requestChannel].postMessage(data)
      }
      else {
        const iframe = document.createElement('iframe')
        iframe.setAttribute('src', `ccpay://${requestChannel}?data=${this._dataToString(data)}`)
        iframe.setAttribute('style', 'display: none')
        document.body.appendChild(iframe)

        setTimeout(() => {
          document.body.removeChild(iframe)
        }, 100)
      }
    }
    else if (this.env.isAndroid) {
      logger.debug(`NativeChannel send to android ${requestChannel}`)
      window[requestChannel].postMessage(this._dataToString(data))
    }
    else if (this.env.isElectron) {
      logger.debug(`NativeChannel send to electron ${requestChannel}`)
      window[requestChannel].postMessage(this._dataToString(data))
    }
    else {
      logger.info(`
Development runtime environment, no data will be sent.
You may mock response by 'window.CCPayNativeClientCallJS({ jsonrpc: '${data.jsonrpc}', id: '${(data as any).id}', result: your expected response object })'
`)
    }
  }

  CCPayNativeClientCallJS (msg: string | JsonRpcResponse | JsonRpcEvent) {
    let rpc: JsonRpcResponse | JsonRpcEvent

    if (typeof msg === 'string') {
      try {
        rpc = JSON.parse(msg)
        logger.debug('CCPayNativeClientResponse received message:', msg)
      }
      catch (err) {
        logger.error('CCPayNativeClientResponse parse message JSON failed.', err)
        return
      }
    }
    else {
      rpc = msg
    }

    logger.debug('CCPay receive <<<<<<<<')
    logger.debug(msg)

    if (isRpcEvent(rpc)) {
      this.emit(rpc.method, rpc.params)
    }
    else if (isRpcResponse(rpc)) {
      const { id, error, result, params } = rpc as any

      const responsePromise = this.responsePromiseHolder[id]
      delete this.responsePromiseHolder[id]

      if (!responsePromise) return logger.error('CCPayNativeClientResponse can not find promise for message:', id)

      if ((Date.now() - responsePromise.createdAt.getTime()) > 5000) logger.warn('CCPayNativeClientResponse take too long(more than 5000ms):', responsePromise.payload)

      if (error) {
        logger.error('CCPayNativeClientResponse error:', error)
        responsePromise.reject(error)
      }
      else {
        responsePromise.resolve(result || params)  // todo: 为了兼容 ios 的 bug（返回了 params 而不是 result），临时把返回的 params 也返回，后续去掉 params 的返回
      }
    }
    else {
      logger.debug('NativeChanel can not handle message', msg)
    }
  }
}
