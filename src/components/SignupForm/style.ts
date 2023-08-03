import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px 1fr;
  grid-template-rows: 1fr 400px 1fr;
  align-items: center;

  form {
    grid-column: 2;
    grid-row: 2;
  }
`
