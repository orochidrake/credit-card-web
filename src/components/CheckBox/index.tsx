import { useEffect, useState } from 'react'
import { Container } from './style'

interface Props {
  label: string
  _checkedAt: string
  _onChange: () => void
  checked?: boolean
}

type CheckBoxProps = JSX.IntrinsicElements['input'] & Props

export default function CheckBox({
  label,
  _checkedAt,
  _onChange,
  checked,
  ...rest
}: CheckBoxProps) {
  const [isChecked, setChecked] = useState(checked)
  const [checkedAt, setCheckedAt] = useState(_checkedAt)

  useEffect(() => {
    if (isChecked) {
      const now = new Date()
      if (checkedAt) {
        setCheckedAt(checkedAt)
      } else {
        setCheckedAt(
          now.toISOString().split('T')[0].split('-').reverse().join('/')
        )
      }
    }
  }, [isChecked, checkedAt])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChange = (el: any) => {
    setChecked(el.target.checked)
    _onChange()
  }

  return (
    <Container>
      {label && <label>{label}</label>}
      <input
        type="checkbox"
        {...rest}
        onChange={onChange}
        checked={isChecked}
      />
      {isChecked && <span>{checkedAt}</span>}
    </Container>
  )
}
