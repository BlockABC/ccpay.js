# CCPay
用于 CCTip 钱包中，用以获取用户信息、请求用户支付等操作。

## JS SDK
### 初始化
```javascript
import CCPay from 'ccpay'
const ccpay = new CCPay({
  app_id: 'app_id_xxxx',
  business_id: 'business_id_xxxxxx'
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

### 充值
唤起充值后
```javascript
ccpay.requestDeposit({
  token_symbol: 'BCH'
})
  .then(console.log)
  .catch(console.error)
```

### 客户端版本
```javascript
console.log(ccpay.env.clientVersion) // '0.0.1'
```
