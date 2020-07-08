import { Logger } from 'loglevel'

import { Env } from '../common/Env'
import { logger } from '../common/logger'
import { BasicChannel } from './BasicChannel'
import {
  isRpcEvent,
  JsonRpcResponse, JsonRpcEvent, isRpcResponse,
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
  public log: Logger
  public requestChannel: string

  constructor (requestChannel: string, logger: Logger, env: Env) {
    super()

    this.log = logger
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

  postMessage (data: any): void {
    const requestChannel = this.requestChannel

    if (this.env.isIOS) {
      this.log.debug(`NativeChannel send to ios ${requestChannel}`)

      if (window.webkit?.messageHandlers?.[requestChannel as any]?.postMessage) {
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
      this.log.debug(`NativeChannel send to android ${requestChannel}`)
      window[requestChannel].postMessage(this._dataToString(data))
    }
    else if (this.env.isElectron) {
      this.log.debug(`NativeChannel send to electron ${requestChannel}`)
      window[requestChannel].postMessage(this._dataToString(data))
    }
    else {
      this.log.info(`
        Development runtime environment, no data will be sent.
        You may create mock response like this in console:
        NativeChannel.response(JSON.stringify(JSON.stringify( { jsonrpc: '${data.jsonrpc as string}', id: '${data.id as string}', result: your expected response object } )))
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

    if (isRpcEvent(rpc)) {
      this.emit(rpc.method, rpc.params)
    }
    else if (isRpcResponse(rpc)) {
      const { id, error, result } = rpc

      const responsePromise = this.responsePromiseHolder[id]
      delete this.responsePromiseHolder[id]

      if (!responsePromise) return logger.error('CCPayNativeClientResponse can not find promise for message:', id)

      if ((Date.now() - responsePromise.createdAt.getTime()) > 5000) logger.warn('CCPayNativeClientResponse take too long(more than 5000ms):', responsePromise.payload)

      logger.debug('CCPayNativeClientResponse find and delete promise:', id)

      if (error) {
        logger.error('CCPayNativeClientResponse error:', error)
        responsePromise.reject(error)
      }
      else {
        logger.debug('CCPayNativeClientResponse result:', result)
        responsePromise.resolve(result)
      }
    }
  }
}
