import HTTP from 'services/http/http'
import { IHTTPResponse } from 'services/http/interface'
import UserInterface from './interface'

export default class User implements UserInterface {
  id: number
  fullname: string
  email: string
  password: string
  role: string

  constructor() {
    this.id = 0
    this.fullname = ''
    this.email = ''
    this.password = ''
    this.role = ''
  }
  async signin(): Promise<IHTTPResponse> {
    const http = new HTTP()

    const body = {
      email: this.email,
      password: this.password
    }
    http.createRequest('POST', `/login`, body)

    if (!(await http.sendRequest())) {
      return new Promise((response, reject) => reject(http.response))
    }

    return new Promise((resolve, reject) => resolve(http.response))
  }

  async signup(): Promise<IHTTPResponse> {
    const http = new HTTP()
    const body = {
      fullname: this.fullname,
      email: this.email,
      password: this.password,
      role: this.role
    }
    http.createRequest('POST', `/signup`, body)

    if (!(await http.sendRequest())) {
      return new Promise((response, reject) => reject(http.response))
    }

    return new Promise((resolve, reject) => resolve(http.response))
  }
  async create(): Promise<IHTTPResponse> {
    const http = new HTTP()
    const body = {
      fullname: this.fullname,
      email: this.email,
      password: this.password,
      role: this.role
    }
    http.createRequest('POST', `/signup`, body)
    http.setAuthorizationBearer()

    if (!(await http.sendRequest())) {
      return new Promise((response, reject) => reject(http.response))
    }

    return new Promise((resolve, reject) => resolve(http.response))
  }

  async update(id: number): Promise<IHTTPResponse> {
    const http = new HTTP()
    const body = {
      fullname: this.fullname,
      email: this.email,
      password: this.password,
      role: this.role
    }
    http.createRequest('PUT', `/user/${id}`, body)
    http.setAuthorizationBearer()

    if (!(await http.sendRequest())) {
      return new Promise((response, reject) => reject(http.response))
    }

    return new Promise((resolve, reject) => resolve(http.response))
  }
  async delete(id: number): Promise<IHTTPResponse> {
    const http = new HTTP()

    http.createRequest('DELETE', `/user/${id}`)
    http.setAuthorizationBearer()

    if (!(await http.sendRequest())) {
      return new Promise((response, reject) => reject(http.response))
    }

    return new Promise((resolve, reject) => resolve(http.response))
  }
}
