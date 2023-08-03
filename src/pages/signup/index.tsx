import * as S from './style'
import SignupForm from 'components/SignupForm'

export default function Signup({
  title = 'Cadastros de Cartão de Credito',
  description = 'Se Cadastre'
}) {
  return (
    <S.Wrapper>
      <S.ContentTop>
        <S.Logo src="/img/favicon.ico" alt="Cadastros de Cartão de Credito" />
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
      </S.ContentTop>
      <SignupForm />
    </S.Wrapper>
  )
}
