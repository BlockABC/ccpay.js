import { mockUserAgent } from 'jest-useragent-mock'
import { Env } from '../../src/common/Env'

describe('Env is not ccpay', () => {
  beforeAll(() => {
    mockUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1')
  })

  it('should not be ccpay', () => {
    const env = new Env()
    expect(env.isCCPay).toBeFalsy()
  })
})

describe('Env is ccpay', () => {
  let env: Env
  beforeAll(() => {
    env = new Env()
    mockUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 CCTipBox/1.3.0 Language/en')
  })

  it('should be ccpay', () => {
    expect(env.isCCPay).toBeTruthy()
  })

  it('version should exist', () => {
    expect(env.clientVersion).toEqual('1.3.0')
  })

  it('should not be Android', () => {
    expect(env.isAndroid).toBeFalsy()
  })

  it('should not be Windows', () => {
    expect(env.isWindows).toBeFalsy()
  })

  it('should not be Mac', () => {
    expect(env.isMac).toBeFalsy()
  })

  it('should be iOS', () => {
    expect(env.isIOS).toBeTruthy()
  })

  it('should be english', () => {
    expect(env.language).toEqual('en')
  })
})
