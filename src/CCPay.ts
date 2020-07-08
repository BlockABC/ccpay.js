import { NativeChannel } from './channel/NativeChannel'
import { shortid } from './common/shortid'
import { Env } from './common/Env'
import { logger } from './common/logger'

const PostMessageChannel = 'CCPayNativeBridge'

export class CCPay {
  private readonly channel: NativeChannel

  env: Env
  version: string

  app_id: string
  business_id: string

  constructor ({ app_id, business_id }: {app_id: string, business_id: string}) {
    this.env = new Env()
    this.version = '0.0.1'
    this.channel = new NativeChannel(PostMessageChannel, logger, this.env)

    this.app_id = app_id
    this.business_id = business_id
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

  public requestUserInfo () {
    return this.channel.request({
      id: shortid('requestUserInfo'),
      method: 'requestUserInfo',
      params: {
        app_id: this.app_id,
        business_id: this.business_id,
      }
    })
  }

  public requestDeposit ({ token_symbol }: { token_symbol: string }) {
    return this.channel.request({
      id: shortid('requestDeposit'),
      method: 'requestDeposit',
      params: {
        app_id: this.app_id,
        business_id: this.business_id,
        token_symbol,
      }
    })
  }
}
