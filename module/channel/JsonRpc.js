export function isRpcResponse(rpc) {
    return rpc.id && (rpc.result || rpc.error);
}
export function isRpcEvent(rpc) {
    return rpc.method && !rpc.id;
}
export function isRpcRequest(rpc) {
    return rpc.method && rpc.id;
}
