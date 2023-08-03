import styled from 'styled-components'

interface ContainerProps {
  gridColumn: string
}

export const Container = styled.div<ContainerProps>`
  display: grid;
  grid-template-rows: 16px 24px 12px;

  grid-column: ${(props) => props.gridColumn || 'span 1'};

  label {
    display: grid;

    font-size: var(--font-size-4);
    margin-bottom: 2px;
    color: var(--primary-color-darker);

    small {
      color: var(--primary-color);
      text-align: right;
      cursor: pointer;
    }
  }

  input {
    font-size: var(--font-size-4);
    padding: 4px 10px;
    outline: none;
    color: var(--primary-color-darker);
    border: 1px solid var(--primary-color-lighter);
    border-radius: 4px;
  }
`

export const Options = styled.ul`
  z-index: 10;
  list-style: none;
  background-color: #fff;

  li {
    z-index: 10;
    cursor: pointer;
    color: var(--primary-color-darker);
    font-size: var(--font-size-4);
    background-color: #fff;
    padding: 4px 10px;
    border-bottom: 1px solid var(--primary-color-lighter);
    border-right: 1px solid var(--primary-color-lighter);
    border-left: 1px solid var(--primary-color-lighter);
    transition: all 0.4s ease;

    &:last-of-type {
      border-bottom-right-radius: 4px;
      border-bottom-left-radius: 4px;
    }

    &:hover {
      z-index: 10;
      background-color: var(--primary-color-lighter);
      transition: all 0.4s ease;
    }
  }
`
