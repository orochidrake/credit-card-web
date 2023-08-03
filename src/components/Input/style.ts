import styled from 'styled-components'

interface ContainerProps {
  gridColumn: string
  display?: string
  labelHidden?: boolean
}

export const Container = styled.div<ContainerProps>`
  display: ${(props) => props.display || 'grid'};
  grid-template-rows: ${(props) =>
    !props.labelHidden ? '1rem 1.5rem 0.75rem' : 'auto'};

  grid-column: ${(props) => props.gridColumn || 'span 1'};

  label {
    display: grid;

    font-size: var(--font-size-1);
    margin-bottom: 2px;
    color: var(--primary-color-darker);

    small {
      color: var(--primary-color);
      text-align: right;
      cursor: pointer;
    }
  }

  input {
    font-size: var(--font-size-1);
    padding: 0.25rem 0.625rem;
    outline: none;
    color: var(--primary-color-darker);
    border: 1px solid var(--border-color);
    border-radius: 0.25rem;
  }
`
