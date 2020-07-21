import { NativeChannel } from './channel/NativeChannel'
import { shortid } from './common/shortid'

export class Webview {
  channel: NativeChannel
  constructor (channel: NativeChannel) {
    this.channel = channel
  }

  close () {
    return this.channel.request({
      id: shortid('webview.close'),
      method: 'webview.close',
    })
  }

  openUrl (url: string) {
    return this.channel.request({
      id: shortid('webview.openUrl'),
      method: 'webview.openUrl',
      params: {
        url
      }
    })
  }
}
