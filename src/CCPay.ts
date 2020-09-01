import { NativeChannel } from './channel/NativeChannel'
import { shortid } from './common/shortid'
import { Env } from './common/Env'
import { initDebug, logger } from './common/logger'
import { Webview } from './Webview'

const PostMessageChannel = 'CCPayNativeBridge'

export class CCPay {
  private readonly channel: NativeChannel

  public webview: Webview

  env: Env
  version: string

  app_id: string
  business_id: string

  constructor ({ app_id, business_id, debug }: {app_id: string, business_id: string, debug: boolean}) {
    this.env = new Env()
    this.version = '0.0.1'

    this.channel = new NativeChannel(PostMessageChannel, logger, this.env)

    this.webview = new Webview(this.channel)

    this.app_id = app_id
    this.business_id = business_id

    if (debug) {
      initDebug()
    }
  }

  public compareVersion (targetVersion = ''): -1 | 1 | 0 | null {
    const clientVersion = this.env.clientVersion

    if (!clientVersion) return null

    const clientVersionParts = clientVersion.split('.')
    const targetVersionParts = targetVersion.split('.')

    for (let i = 0; i < clientVersionParts.length; i++) {
      const clientVersionPart = parseInt(clientVersionParts[i])
      const targetVersionPart = parseInt(targetVersionParts[i])

      if (clientVersionPart > targetVersionPart) {
        return 1
      }
      else if (clientVersionPart < targetVersionPart) {
        return -1
      }
    }

    return 0
  }

  public on (event: string, callback: () => void) {
    this.channel.on(event, callback)
  }

  public off (event: string, callback: () => void) {
    this.channel.off(event, callback)
  }

  public login () {
    return this.channel.request({
      id: shortid('login'),
      method: 'login',
      params: {
        app_id: this.app_id,
      }
    })
  }

  public requestUserInfo () {
    return this.channel.request({
      id: shortid('requestUserInfo'),
      method: 'requestUserInfo',
      params: {
        app_id: this.app_id,
      }
    })
  }

  public requestDeposit ({ symbol }: { symbol: string }) {
    return this.channel.request({
      id: shortid('requestDeposit'),
      method: 'requestDeposit',
      params: {
        app_id: this.app_id,
        symbol,
      }
    })
  }

  public openUrl ({ url }: { url: string }) {
    return this.channel.request({
      id: shortid('url'),
      method: 'openUrl',
      params: {
        url,
      }
    })
  }
}
