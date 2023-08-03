import { useEffect, useRef } from 'react'
import { Container } from './style'
import { useField } from '@unform/core'

interface Props {
  label: string
  name: string
  gridColumn?: string
  options: OptionsInterface[]
  onChangeHandler?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  hideDefault?: boolean
}
type SelectProps = JSX.IntrinsicElements['select'] & Props

interface OptionsInterface {
  value: number | string
  label: string
}

export default function Select({
  label,
  name,
  gridColumn,
  options,
  onChangeHandler,
  hideDefault,
  ...rest
}: SelectProps) {
  const inputRef = useRef<HTMLSelectElement>(null)
  const { fieldName, registerField, error, clearError } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref: any) => ref.current.value,
      setValue: (ref: any, value: any) => {
        clearError()
        ref.current.value = value
      }
    })
  }, [fieldName, registerField, clearError])

  return (
    <Container gridColumn={gridColumn || 'span 1'}>
      <label htmlFor={fieldName}>{label}</label>
      <select
        ref={inputRef}
        {...rest}
        onFocus={clearError}
        onChange={(ev) => onChangeHandler && onChangeHandler(ev.target.value)}
      >
        {!hideDefault && <option value="0">Selecione</option>}
        {options.map((o) => {
          return (
            <option key={o.value} value={o.value.toString()}>
              {o.label}
            </option>
          )
        })}
      </select>
      {error && <span className="error">{error}</span>}
    </Container>
  )
}
