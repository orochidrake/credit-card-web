import styled from 'styled-components'

export const Wrapper = styled.main`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`
export const ContentTop = styled.div`
  background-color: var(--dark-green);
  padding: 3rem;
  color: #fff;
  width: 100%;
  height: 100%;
`

export const Logo = styled.img`
  width: 2rem;
  margin-bottom: 2rem;
`

export const Title = styled.h1`
  font-size: var(--font-size-5);
`

export const Description = styled.h2`
  font-size: var(--font-size-5);
  font-weight: 400;
`

export const Illustration = styled.img`
  margin-top: 3rem;
  width: min(30rem, 100%);
`
export const ContainerLogin = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px 1fr;
  grid-template-rows: 1fr 400px 1fr;
  align-items: center;
`
