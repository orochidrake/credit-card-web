import { useEffect, useRef } from 'react'
import { Container } from './style'
import { useField } from '@unform/core'

interface PredefinedType {
  dataType: string
  type: string
  value: string | number | undefined
  mask?: (v: string) => string
}

const predefinedTypes: Array<PredefinedType> = [
  {
    dataType: 'text',
    type: 'text',
    value: ''
  },
  {
    dataType: 'numeric',
    type: 'phone',
    value: ''
  },
  {
    dataType: 'month',
    type: 'month',
    value: ''
  },
  {
    dataType: 'datetime',
    type: 'datetime-local',
    value: ''
  },
  {
    dataType: 'email',
    type: 'email',
    value: ''
  },
  {
    dataType: 'password',
    type: 'password',
    value: ''
  }
]

interface Props {
  name: string
  label: string
  display?: string
  dataType?: string
  gridColumn?: string
  onChangeHandler?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  labelHidden?: boolean
}
type InputProps = JSX.IntrinsicElements['input'] & Props

export default function Input({
  name,
  label,
  display,
  dataType,
  gridColumn,
  onChangeHandler,
  labelHidden,
  ...rest
}: InputProps) {
  const swap = predefinedTypes.filter((i) => i.dataType == dataType)
  const selectedType = swap.length ? swap[0] : predefinedTypes[0]

  const inputRef = useRef<HTMLInputElement>(null)
  const { fieldName, registerField, error, clearError } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref: any) => ref.current.value,
      setValue: (ref: any, value: string) => {
        clearError()

        if (selectedType.mask) {
          value = selectedType.mask(value)
        }

        ref.current.value = value
      }
    })
  }, [fieldName, registerField, selectedType, clearError])

  return (
    <Container
      display={display}
      gridColumn={gridColumn || 'span 1'}
      labelHidden={labelHidden}
    >
      {!labelHidden && <label htmlFor={fieldName}>{label}</label>}
      <input
        ref={inputRef}
        type={selectedType.type}
        {...rest}
        onFocus={clearError}
        onChange={(ev) => {
          let value = ev.target.value
          if (selectedType.mask) {
            value = selectedType.mask(ev.target.value)
            ev.target.value = value
          }
          onChangeHandler && onChangeHandler(value)
        }}
      />
      {error && <span className="error">{error}</span>}
    </Container>
  )
}
