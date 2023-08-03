import HTTP from 'services/http/http'
import { IHTTPResponse } from 'services/http/interface'
import { CreditCardInterface } from './interface'
import http from 'services/http/http'

export default class CreditCard implements CreditCardInterface {
  id: number
  expDate: string
  holder: string
  number: string
  brand: string
  cvv: number

  constructor() {
    this.id = 0
    this.expDate = ''
    this.holder = ''
    this.number = ''
    this.brand = ''
    this.cvv = 0
  }

  async createCard(): Promise<IHTTPResponse> {
    const http = new HTTP()
    const body = {
      exp_date: this.expDate,
      holder: this.holder,
      number: this.number.replace(/\s+/g, ''),
      cvv: this.cvv
    }
    http.createRequest('POST', `/credit-card`, body)
    http.setAuthorizationBearer()

    if (!(await http.sendRequest())) {
      return new Promise((response, reject) => reject(http.response))
    }

    return new Promise((resolve, reject) => resolve(http.response))
  }

  async deleteCard(id: number): Promise<IHTTPResponse> {
    const http = new HTTP()

    http.createRequest('DELETE', `/credit-card/${id}`)
    http.setAuthorizationBearer()

    if (!(await http.sendRequest())) {
      return new Promise((response, reject) => reject(http.response))
    }

    return new Promise((resolve, reject) => resolve(http.response))
  }
}
