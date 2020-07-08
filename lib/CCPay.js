"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CCPay = void 0;
const NativeChannel_1 = require("./channel/NativeChannel");
const shortid_1 = require("./common/shortid");
const Env_1 = require("./common/Env");
const logger_1 = require("./common/logger");
const PostMessageChannel = 'ccpay';
class CCPay {
    constructor() {
        this.env = new Env_1.Env();
        this.version = '0.0.1';
        this.channel = new NativeChannel_1.NativeChannel(PostMessageChannel, logger_1.logger, this.env);
    }
    compareVersion(targetVersion = '') {
        const clientVersion = this.env.clientVersion;
        if (!clientVersion)
            return null;
        const clientVersionParts = clientVersion.split('.');
        const targetVersionParts = targetVersion.split('.');
        for (let i = 0; i < clientVersionParts.length; i++) {
            const clientVersionPart = parseInt(clientVersionParts[i]);
            const targetVersionPart = parseInt(targetVersionParts[i]);
            if (clientVersionPart > targetVersionPart) {
                return 1;
            }
            else if (clientVersionPart < targetVersionPart) {
                return -1;
            }
        }
        return 0;
    }
    on(event, callback) {
        this.channel.on(event, callback);
    }
    off(event, callback) {
        this.channel.off(event, callback);
    }
    getUserInfo() {
        return this.channel.request({
            id: shortid_1.shortid('getUserInfo'),
            method: 'getUserInfo',
        });
    }
    pay() {
    }
    payback() {
    }
}
exports.CCPay = CCPay;
