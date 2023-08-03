export interface ErrorInterface {
  field: string
  message: string
}

export interface ErrorsInterface {
  title: string
  errors: Array<ErrorInterface>
  icon: string
  normalizeError(text: string): string
  setTitle(title: string): void
  showErrors(): void
  addError(error: ErrorInterface): void
  appendError(error: ErrorInterface): void
}
