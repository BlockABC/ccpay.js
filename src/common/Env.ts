export class Env {
  get ua () {
    return navigator.userAgent.toLowerCase()
  }

  get isIOS () {
    return this.ua.includes('iphone')
  }

  get isAndroid () {
    return this.ua.includes('android')
  }

  get isElectron () {
    return this.ua.includes('electron')
  }

  get isMac () {
    return this.ua.includes('macintosh')
  }

  get isWindows () {
    return this.ua.includes('windows')
  }

  get isCCPay () {
    return this.ua.includes('ccpay') || this.ua.includes('cctipbox') || this.ua.includes('cctip')
  }

  get language () {
    const matches = this.ua.match(/Language\/([a-zA-Z-_]+)/gi) // 形如 Language/zh-CN
    const splitParts: string[] = matches?.[0]?.split('/') || []
    return splitParts[1]
  }

  get clientVersion () {
    const matches = this.ua.match(/(CCPay|CCTip|CCTipBox)\/([0-9.a-zA-Z-_]+)/gi) // 形如 CCPay/1.2.3
    const splitParts: string[] = matches?.[0]?.split('/') || []
    return splitParts[1]
  }
}
