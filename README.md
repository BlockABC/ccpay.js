# CCPay
用于 CCTip 钱包中，用以获取用户信息、请求用户支付等操作。

## JS SDK
### 初始化
```javascript
import CCPay from 'ccpay'
const ccpay = new CCPay({
  app_id: 'app_id_xxxx',
})
```

### 判断 CCPay
```javascript
console.log(ccpay.env.isCCPay) // true/false
```

### 登录
获取用户 access_token，用于后台校验用户的真实性和请求的有效性。[CCPay 商户接口文档](https://hackmd.io/@blockabc/BJoGx_e1D#6-%E6%A0%A1%E9%AA%8C%E7%94%B1-CCTip%C2%B7APP-%E4%B8%8B%E5%8F%91%E7%9A%84-AccessToken)
```javascript
ccpay.login().then(console.log).catch(console.error)
```
响应
```json5
{
  "sys_id": "87333djfd33j3jk33jk2", // 用户在 cctip 平台的 id
  "access_token": "accessTokenxxxxxxxxxxxxxxxxx", // 用户的 access_token
  "expire_at": 1594613256, // token 有效期
}
```

### 获取用户信息
目前通过白名单机制，白名单内部的 app 都可通过 SDK 直接登录并获取用户信息，无需用户手动授权。
```javascript
ccpay.requestUserInfo()
  .then(console.log)
  .catch(console.log)
```
响应
```json5
{
    "sys_id": "893sfdjdu38dj389dj3", // 该用户的唯一 id
    "nickname": "God",
    "avatar": "https://baidu.com/a.png",
    "sns_platform": "wechat", // 该用户的来源平台，目前包括 wechat/telegram/discord/twitter/reddit
    "sns_id": "222323243f33333", // 该用户在社交平台的 id，用于关联
}
```

### 充值
唤起充值后
```javascript
ccpay.requestDeposit({
  symbol: 'BCH'
})
  .then(res => {
    if (res) {
      console.log(res)
      alert('充值成功')
    }
    else {
      alert('用户取消充值')
    }
  })
  .catch(console.error)
```
充值成功返回值，失败返回空(null)
```json5
{
  "record_id": "record_id_xyz123",
  "symbol": "BCH",
  "amount": "123.456"
}
```

### 客户端版本
```javascript
console.log(ccpay.env.clientVersion) // '0.0.1'
```
