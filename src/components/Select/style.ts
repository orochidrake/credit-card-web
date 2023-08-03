import styled from 'styled-components'

interface ContainerProps {
  gridColumn: string
}

export const Container = styled.div<ContainerProps>`
  display: grid;
  grid-template-rows: 16px 24px 12px;

  grid-column: ${(props) => props.gridColumn || 'span 1'};

  label {
    font-size: var(--font-size-1);
    margin-bottom: 2px;
    color: var(--primary-color-darker);

    small {
      color: var(--primary-color);
      text-align: right;
      cursor: pointer;
    }
  }

  select {
    font-size: var(--font-size-1);

    outline: none;
    color: var(--primary-color-darker);
    border: 1px solid var(--border-color);
    border-radius: 0.25rem;
  }
`
