import styled from 'styled-components'

export const Container = styled.div`
  padding: 1.5rem;
  margin-left: 10vw;

  h1 {
    margin: 0 0 2rem 0;
    font-size: var(--font-size-5);
    color: var(--primary-color);
  }

  .users {
    border: 1px solid var(--primary-color);
    border-radius: 4px;
    height: 80vh;
    overflow-y: scroll;
  }
`
