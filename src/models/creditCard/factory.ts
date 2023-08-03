import { toSnake } from '../../utils/helpers/normalizeAttr'
import CreditCard from '.'
import { CreditCardInterface } from './interface'

export default class CreditCardCreator {
  static factory(data: any): CreditCardInterface {
    const c = new CreditCard()

    Object.keys(c).forEach((att) => {
      if (data[att]) {
        Object.defineProperty(c, att, { value: data[att] })
        return
      }

      if (data[toSnake(att)]) {
        Object.defineProperty(c, att, { value: data[toSnake(att)] })
      }
    })

    return c
  }
}
