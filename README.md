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
目前通过白名单机制，白名单内部的 app 都可通过 SDK 直接登录并获取用户信息，无需用户手动授权。
```javascript
ccpay.requestUserInfo()
  .then(console.log)
  .catch(console.log)
```
响应
```json
{
    "sys_id": "893sfdjdu38dj389dj3",
    "nickname": "God",
    "avatar": "https://baidu.com/a.png",
    "platform": "wechat"
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
```json
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
