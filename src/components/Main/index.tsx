import * as S from './styles'
import SigninForm from 'components/SigninForm'

const Main = ({
  title = 'Cadastros de Cartão de Credito',
  description = 'Dashboard Admin'
}) => (
  <>
    <S.Wrapper>
      <S.ContentTop>
        <S.Logo src="/img/favicon.ico" alt="Cadastros de Cartão de Credito" />
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
      </S.ContentTop>
      <SigninForm />
    </S.Wrapper>
  </>
)

export default Main
