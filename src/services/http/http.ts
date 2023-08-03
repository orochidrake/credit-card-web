import {
  IHTTPHeader,
  IHTTP,
  IHTTPQueryParam,
  IHTTPRequest,
  IHTTPResponse
} from './interface'

class HTTPRequest implements IHTTPRequest {
  public method: string
  public url: string
  public body: any
  public ready: boolean
  public headers: Array<IHTTPHeader>
  public ok: boolean
  queryParams: IHTTPQueryParam[]
  errorMessage: string

  constructor() {
    this.method = ''
    this.url = ''
    this.body = null
    this.ready = false
    this.errorMessage = ''
    this.ok = false
    this.headers = []
    this.queryParams = []
  }

  async sendRequest(): Promise<IHTTPResponse> {
    const response = new HTTPResponse()

    if (!this.ready) {
      response.message = 'request not ready to been sent'
      return response
    }

    const options: RequestInit = {
      method: this.method
    }

    if (this.body) {
      options.body = JSON.stringify(this.body)

      this.setHeader({ key: 'Content-Type', value: 'application/json' })
    }

    if (this.headers.length) {
      const headers: HeadersInit = new Headers()
      for (let i = 0; i < this.headers.length; i++) {
        headers.set(this.headers[i].key, this.headers[i].value)
      }
      options.headers = headers
    }

    if (this.queryParams.length) {
      const params: string[] = []
      this.queryParams.forEach((q) => {
        params.push(`${q.key}=${q.value}`)
      })

      this.url += `?${params.join('&')}`
    }

    const resp = await fetch(this.url, options)
    response.status = resp.status
    response.ok = resp.ok

    if (!resp.ok) {
      response.message = resp.statusText
    } else {
      if (resp.status != 204) {
        try {
          response.body = await resp.json()
        } catch (e) {
          console.log(e)
        }
      }
    }

    return response
  }

  setHeader(header: IHTTPHeader): boolean {
    const headers = this.headers.filter((h) => h.key != header.key)
    headers.push(header)

    this.headers = headers
    return true
  }

  setQueryParam(param: IHTTPQueryParam): boolean {
    this.queryParams.push(param)
    return true
  }
}

export class HTTPResponse implements IHTTPResponse {
  public status: number
  public body: any
  public message: string
  public ok: boolean

  constructor() {
    this.status = 0
    this.body = null
    this.message = ''
    this.ok = false
  }
}

export default class HTTP implements IHTTP {
  public request: IHTTPRequest
  public response: IHTTPResponse
  public errorMessage: string

  constructor() {
    this.request = new HTTPRequest()
    this.response = new HTTPResponse()
    this.errorMessage = ''
  }
  setVersion(v: number): boolean {
    throw new Error('Method not implemented.')
  }

  createRequest(method: string, path: string, body: any = null): boolean {
    if (method == '') {
      this.errorMessage = 'method can`t be empty'
      return false
    }

    this.request.method = method

    if (path == '') {
      this.errorMessage = 'url can`t be empty'
      return false
    }

    this.request.url = process.env.NEXT_PUBLIC_API + path

    if (body && typeof body != 'object') {
      this.errorMessage = 'body must be a object serializable'
      return false
    }

    this.request.body = body
    this.request.ready = true

    return true
  }

  async sendRequest(): Promise<boolean> {
    this.response = await this.request.sendRequest()
    if (!this.response.ok) {
      this.errorMessage = this.response.message
      return false
    }

    return true
  }

  setHeader(header: IHTTPHeader): boolean {
    return this.request.setHeader(header)
  }

  setQueryParams(queryParam: IHTTPQueryParam): boolean {
    return this.request.setQueryParam(queryParam)
  }

  setAuthorization(token?: string): boolean {
    if (!token) {
      try {
        const _t = localStorage.getItem('__token__auth__')
        if (!_t) {
          return false
        }
        token = _t
      } catch (err) {
        console.log(err)
        return false
      }
    }

    return this.setHeader({ key: 'Authorization', value: token })
  }
  setAuthorizationBearer(token?: string): boolean {
    if (!token) {
      try {
        const _t = localStorage.getItem('__token__auth__')
        if (!_t) {
          return false
        }
        token = _t
      } catch (err) {
        console.log(err)
        return false
      }
    }

    return this.setHeader({ key: 'Authorization', value: `Bearer ${token}` })
  }
}
