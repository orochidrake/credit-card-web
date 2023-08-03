import { Container } from './style'

interface Props {
  text: string
  gridColumn?: string
  color?: string
}

type ButtonProps = JSX.IntrinsicElements['button'] & Props

export default function Button({
  text,
  gridColumn,
  color,
  ...rest
}: ButtonProps) {
  return (
    <Container
      gridColumn={gridColumn || 'span 1'}
      customColor={color || 'var(--primary-color)'}
    >
      <button {...rest}>{text}</button>
    </Container>
  )
}
