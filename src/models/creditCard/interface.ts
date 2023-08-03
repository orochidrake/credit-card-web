import { IHTTPResponse } from 'services/http/interface'

export interface CreditCardInterface {
  id: number
  expDate: string
  holder: string
  number: string
  brand: string
  cvv: number

  createCard(): Promise<IHTTPResponse>
  updateCard(): Promise<IHTTPResponse>
  deleteCard(): Promise<IHTTPResponse>
}

export interface CreditCardSignupResponseInterface {
  CreditCard: CreditCardInterface
}
