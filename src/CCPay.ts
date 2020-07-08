import { NativeChannel } from './channel/NativeChannel'
import { shortid } from './common/shortid'
import { Env } from './common/Env'
import { logger } from './common/logger'

const PostMessageChannel = 'ccpay'

export class CCPay {
  private readonly channel: NativeChannel

  env: Env
  version: string

  constructor () {
    this.env = new Env()
    this.version = '0.0.1'
    this.channel = new NativeChannel(PostMessageChannel, logger, this.env)
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

  public getUserInfo () {
    return this.channel.request({
      id: shortid('getUserInfo'),
      method: 'getUserInfo',
    })
  }

  public requestDeposit ({ appId, businessId, tokenSymbol }: { appId: string, businessId: string, tokenSymbol: string }) {
    return this.channel.request({
      id: shortid('requestDeposit'),
      method: 'requestDeposit',
      params: {
        appId,
        businessId,
        tokenSymbol,
      }
    })
  }
}
