import styled from 'styled-components'

export const Container = styled.div`
  background-color: var(--dark-green);
  position: fixed;
  left: 0;
  top: 0;
  width: 10vw;
  height: 100vh;
  max-height: 100vh;
  padding-top: 1.25rem;
  padding-left: 1.25rem;

  .menu-items {
    height: calc(100vh - 60px);
    padding-bottom: 2rem;
  }
`

export const Item = styled.div`
  color: #fff;
  font-size: var(--font-size-3);
  cursor: pointer;
  padding-top: 15px;
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }

  a {
    text-decoration: none;
    color: #fff;
  }
`

export const SubItem = styled.div`
  color: #fff;
  font-size: var(--font-size-3);
  cursor: pointer;
  padding-left: 1rem;
  padding-top: 4px;
  padding-bottom: 4px;
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }

  a {
    text-decoration: none;
    color: #fff;
  }
`
