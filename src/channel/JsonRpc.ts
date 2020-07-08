
export interface JsonRpcRequest {
  jsonrpc: '2.0',
  method: string,
  params: object,
  id: string,
}

export interface JsonRpcEvent {
  jsonrpc: '2.0',
  method: string,
  params: object,
}

export interface JsonRpcResponse {
  jsonrpc: '2.0',
  result: object,
  error: {
    code: number,
    errorno?: string, // used for trace error chain
    message: string,
    data: object,
  },
  id: string,
}

export type JsonRpcPayload = JsonRpcEvent | JsonRpcRequest | JsonRpcResponse

export function isRpcPayload (rpc: any): boolean {
  return rpc.jsonrpc === '2.0'
}

export function isRpcResponse (rpc: any): rpc is JsonRpcResponse {
  return isRpcPayload(rpc) && !rpc.method && rpc.id
}

export function isRpcEvent (rpc: any): rpc is JsonRpcEvent {
  return isRpcPayload(rpc) && rpc.method && !rpc.id
}

export function isRpcRequest (rpc: any): rpc is JsonRpcRequest {
  return isRpcPayload(rpc) && rpc.method && rpc.id
}
