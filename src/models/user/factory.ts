import { toSnake } from '../../utils/helpers/normalizeAttr'
import User from '.'
import { UserInterface } from './interface'

export default class UserCreator {
  static factory(data: any): UserInterface {
    const u = new User()

    Object.keys(u).forEach((att) => {
      if (data[att]) {
        Object.defineProperty(u, att, { value: data[att] })
        return
      }

      if (data[toSnake(att)]) {
        Object.defineProperty(u, att, { value: data[toSnake(att)] })
      }
    })

    return u
  }
}
