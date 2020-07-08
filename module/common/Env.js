const ua = navigator.userAgent.toLowerCase();
export class Env {
    constructor() {
        this.isIOS = ua.includes('iphone');
        this.isAndroid = ua.includes('android');
        this.isElectron = ua.includes('electron');
        this.isMac = ua.includes('mac');
        this.isWindows = ua.includes('windows');
        this.isCCPay = ua.includes('ccpay');
    }
    get language() {
        var _a;
        const matches = ua.match(/Language\/([a-zA-Z-_]+)/g); // 形如 Language/zh-CN
        const splitParts = ((_a = matches === null || matches === void 0 ? void 0 : matches[0]) === null || _a === void 0 ? void 0 : _a.split('/')) || [];
        return splitParts[1];
    }
    get clientVersion() {
        var _a;
        const matches = ua.match(/CCPay\/([a-zA-Z-_]+)/g); // 形如 CCPay/1.2.3
        const splitParts = ((_a = matches === null || matches === void 0 ? void 0 : matches[0]) === null || _a === void 0 ? void 0 : _a.split('/')) || [];
        return splitParts[1];
    }
}
