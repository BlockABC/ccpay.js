"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRpcRequest = exports.isRpcEvent = exports.isRpcResponse = void 0;
function isRpcResponse(rpc) {
    return rpc.id && (rpc.result || rpc.error);
}
exports.isRpcResponse = isRpcResponse;
function isRpcEvent(rpc) {
    return rpc.method && !rpc.id;
}
exports.isRpcEvent = isRpcEvent;
function isRpcRequest(rpc) {
    return rpc.method && rpc.id;
}
exports.isRpcRequest = isRpcRequest;
