import EventEmitter from 'eventemitter3';
import { logger } from '../common/logger';
import { isRpcRequest } from './JsonRpc';
export class BasicChannel extends EventEmitter {
    constructor() {
        super(...arguments);
        this.responsePromiseHolder = {};
    }
    request(payload) {
        return new Promise((resolve, reject) => {
            const rpc = Object.assign({ jsonrpc: '2.0' }, payload);
            if (isRpcRequest(rpc)) {
                logger.debug('BasicChannel.request add promise: ', rpc.id);
                this.responsePromiseHolder[rpc.id] = {
                    resolve,
                    reject,
                    payload: rpc,
                    createdAt: new Date()
                };
            }
            logger.debug('BasicChannel.request send message:', rpc);
            this.postMessage(rpc);
        });
    }
}
