import { CreditCardInterface } from './interface'

interface signupValidatorResponseInterface {
  message: string
  error: boolean
}
export const signupValidator = (
  c: CreditCardInterface
): signupValidatorResponseInterface => {
  if (c.holder.length == 0) {
    return {
      message: 'Nome muito curto',
      error: true
    }
  }

  if (c.holder.split(' ').length < 2) {
    return {
      message: 'Nome completo é obrigatório',
      error: true
    }
  }

  if (c.number.toString().length == 0) {
    return {
      message: 'Numero do cartão é obrigatorio',
      error: true
    }
  }

  return { message: '', error: false }
}
