import { NativeChannel } from './channel/NativeChannel';
import { shortid } from './common/shortid';
import { Env } from './common/Env';
import { logger } from './common/logger';
const PostMessageChannel = 'ccpay';
export class CCPay {
    constructor() {
        this.env = new Env();
        this.version = '0.0.1';
        this.channel = new NativeChannel(PostMessageChannel, logger, this.env);
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
            id: shortid('getUserInfo'),
            method: 'getUserInfo',
        });
    }
    pay() {
    }
    payback() {
    }
}
