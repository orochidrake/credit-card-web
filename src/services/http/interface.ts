export interface IHTTP {
  request: IHTTPRequest
  response: IHTTPResponse
  errorMessage: string
  createRequest(method: string, url: string, body: any): boolean
  sendRequest(): Promise<boolean>
  setHeader(header: IHTTPHeader): boolean
  setAuthorization(token?: string): boolean
  setVersion(v: number): boolean
  setQueryParams(queryParam: IHTTPQueryParam): boolean
}

export interface IHTTPRequest {
  method: string
  url: string
  body: any
  headers: Array<IHTTPHeader>
  ready: boolean
  errorMessage: string
  sendRequest(): Promise<IHTTPResponse>
  setHeader(header: IHTTPHeader): boolean
  setQueryParam(param: IHTTPQueryParam): boolean
}

export interface IHTTPResponse {
  status: number
  body: any
  message: string
  ok: boolean
}

export interface IHTTPHeader {
  key: string
  value: string
}

export interface IHTTPQueryParam {
  key: string
  value: string
}
