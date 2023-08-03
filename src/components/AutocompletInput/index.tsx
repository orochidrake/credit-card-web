import { useEffect, useRef } from 'react'
import { Container, Options } from './style'
import { useField } from '@unform/core'

interface Option {
  id: number
  label: string
}

interface Props {
  searchName: string
  label: string
  options: Option[]
  onSelectHandler: any // eslint-disable-line @typescript-eslint/no-explicit-any
  gridColumn?: string
  onChangeHandler?: any // eslint-disable-line @typescript-eslint/no-explicit-any
}
type AutocompleteInputProps = JSX.IntrinsicElements['input'] & Props

export default function AutocompleteInput({
  label,
  searchName,
  options,
  onSelectHandler,
  gridColumn,
  onChangeHandler,
  ...rest
}: AutocompleteInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { fieldName, registerField } = useField(searchName)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => ref.current.value,
      setValue: (ref, value) => {
        ref.current.value = value
      }
    })
  }, [fieldName, registerField])

  return (
    <Container gridColumn={gridColumn || 'span 1'}>
      <label htmlFor={fieldName}>{label}</label>
      <input
        ref={inputRef}
        {...rest}
        onChange={(ev) => onChangeHandler && onChangeHandler(ev.target.value)}
      />
      <Options>
        {options.map((o) => (
          <li key={o.id} onClick={() => onSelectHandler(o.id)}>
            {o.label}
          </li>
        ))}
      </Options>
    </Container>
  )
}
