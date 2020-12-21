# CCPay
[[English Doc]](./README.md) [[中文文档]](./README.zh.md)

This lib can be used in CCTip Box to get user info, request payment, etc.

## JS SDK

## Install
Install via NPM
```shell script
npm install ccpay.js -S
```

Install via HTML Script
```html
<script src="https://cdn.jsdelivr.net/npm/ccpay.js"></script>
```

### Initialize
```javascript
import CCPay from 'ccpay.js'
const ccpay = new CCPay({
  app_id: 'app_id_xxxx',
  debug: true, // Enable debug mode, log inside logs
})
```

### Check CCPay environment
```javascript
console.log(ccpay.env.isCCPay) // true/false
```

### Login
Get user access_token and pass it to backend server to validate the validity of user.[CCPay Merchant API Doc](https://hackmd.io/@blockabc/BJoGx_e1D#6-%E6%A0%A1%E9%AA%8C%E7%94%B1-CCTip%C2%B7APP-%E4%B8%8B%E5%8F%91%E7%9A%84-AccessToken)

```javascript
ccpay.login().then(console.log).catch(console.error)
```
Response
```json5
{
  "sys_id": "87333djfd33j3jk33jk2", // The user id on CCTip platform
  "access_token": "accessTokenxxxxxxxxxxxxxxxxx", // User's access_token
  "expire_at": 1594613256, // Token validity period
}
```

### Get user info
There is a whitelist that allows Apps within the whitelist to login and get user information directly from this SDK, without the need for user authorization.

```javascript
ccpay.requestUserInfo()
  .then(console.log)
  .catch(console.log)
```
Response
```json5
{
    "sys_id": "893sfdjdu38dj389dj3", // Unique id for this user
    "nickname": "God",
    "avatar": "https://baidu.com/a.png",
    "sns_platform": "wechat", // The platform where user come from，including wechat/telegram/discord/twitter/reddit for now.
    "sns_id": "222323243f33333", // The user's id on the social platform, used to association with platform's account.
}
```

### Deposit
Request user to deposit:
```javascript
ccpay.requestDeposit({
  symbol: 'BCH'
})
  .then(res => {
    if (res) {
      console.log(res)
      alert('Deposit success')
    }
    else {
      alert('User cancelled')
    }
  })
  .catch(console.error)
```
It will return a amount after depositing successfully, otherwise it will return empty.
```json5
{
  "record_id": "record_id_xyz123",
  "symbol": "BCH",
  "amount": "123.456"
}
```

### Get client version
```javascript
console.log(ccpay.env.clientVersion) // '0.0.1'
```

### Get client language
```javascript
console.log(ccpay.env.language) // 'en', 'id-ID'
```
