
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
    message: string,
    data: object,
  },
  id: string,
}

export type JsonRpcPayload = JsonRpcEvent | JsonRpcRequest | JsonRpcResponse

export function isRpcResponse (rpc: JsonRpcPayload): rpc is JsonRpcResponse {
  return (rpc as any).id && ((rpc as any).result || (rpc as any).error)
}

export function isRpcEvent (rpc: JsonRpcPayload): rpc is JsonRpcEvent {
  return (rpc as any).method && !(rpc as any).id
}

export function isRpcRequest (rpc: JsonRpcPayload): rpc is JsonRpcRequest {
  return (rpc as any).method && (rpc as any).id
}
