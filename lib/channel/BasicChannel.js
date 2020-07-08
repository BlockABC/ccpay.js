"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicChannel = void 0;
const eventemitter3_1 = require("eventemitter3");
const logger_1 = require("../common/logger");
const JsonRpc_1 = require("./JsonRpc");
class BasicChannel extends eventemitter3_1.default {
    constructor() {
        super(...arguments);
        this.responsePromiseHolder = {};
    }
    request(payload) {
        return new Promise((resolve, reject) => {
            const rpc = Object.assign({ jsonrpc: '2.0' }, payload);
            if (JsonRpc_1.isRpcRequest(rpc)) {
                logger_1.logger.debug('BasicChannel.request add promise: ', rpc.id);
                this.responsePromiseHolder[rpc.id] = {
                    resolve,
                    reject,
                    payload: rpc,
                    createdAt: new Date()
                };
            }
            logger_1.logger.debug('BasicChannel.request send message:', rpc);
            this.postMessage(rpc);
        });
    }
}
exports.BasicChannel = BasicChannel;
