import Swal from 'sweetalert2'
import { ErrorsMap } from '@/utils/constants/errors'
import { ErrorInterface, ErrorsInterface } from './interface'

class Errors implements ErrorsInterface {
  title: string
  errors: Array<ErrorInterface>
  icon: string

  constructor() {
    this.title = ''
    this.errors = []
    this.icon = ''
  }
  normalizeError(text: string): string {
    throw new Error('Method not implemented.')
  }

  static normalizeError(label: string): string {
    const _errors = ErrorsMap.filter((e) => e.label == label)
    if (_errors.length) {
      return _errors[0].message
    }

    return ''
  }

  setTitle(title: string) {
    this.title = title
  }

  showErrors() {
    const container = document.createElement('div')
    container.classList.add(
      this.errors.length == 1 ? 'error-container' : 'errors-container'
    )
    container.innerHTML = this.errors
      .map((e) => {
        if (!e.field) {
          return `<span>${e.message}</span>`
        }

        return `<span>${e.field}: </span><span>${e.message}</span>`
      })
      .join('')
    Swal.fire({
      title: this.title,
      html: container,
      icon: 'warning'
    })
  }

  addError(error: ErrorInterface) {
    const exists = this.errors.filter((e) => e.field == error.field).length

    if (exists) {
      this.appendError(error)
    } else {
      this.errors.push(error)
    }
  }

  appendError(error: ErrorInterface) {
    this.errors = this.errors.map((e) => {
      if (e.field == error.field) {
        e.message += `, ${error.message}`
      }

      return e
    })
  }
}
export default Errors
