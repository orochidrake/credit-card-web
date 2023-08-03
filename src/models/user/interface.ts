import { IHTTPResponse } from 'services/http/interface'

export default interface UserInterface {
  id: number
  fullname: string
  email: string
  password: string
  role: string

  signup(): Promise<IHTTPResponse>
  signin(): Promise<IHTTPResponse>
  create(): Promise<IHTTPResponse>
}

export interface UserSignupResponseInterface {
  user: UserInterface
}
