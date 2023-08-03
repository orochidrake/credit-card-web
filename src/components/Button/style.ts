import styled from 'styled-components'

interface ContainerProps {
  gridColumn: string
  customColor: string
}

export const Container = styled.div<ContainerProps>`
  display: grid;

  grid-column: ${(props) => props.gridColumn || 'span 1'};

  button {
    padding: 10px 15px;
    border: 1px solid ${(props) => props.customColor || 'var(--primary-color)'};
    color: ${(props) => props.customColor || 'var(--primary-color)'};
    background: #fff;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.6s ease;

    &:hover {
      background: ${(props) => props.customColor || 'var(--primary-color)'};
      color: #fff;
      transition: all 0.6s ease;
    }
  }
`
