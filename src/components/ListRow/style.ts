import styled from 'styled-components'

interface ItemProps {
  color?: string
}
export const Item = styled.div<ItemProps>`
  color: ${(props) => props.color || 'var(--primary-color-darker)'}!important;
`

interface ContainerProps {
  templateColumns: string
}

export const Container = styled.div<ContainerProps>`
  display: grid;
  grid-template-columns: ${(props) => props.templateColumns} 1fr;
  grid-column-gap: 10px;
  padding: 8px;
  transition: background-color 0.4s ease;

  &:nth-child(odd) {
    background-color: #9becc3;
  }

  &:hover {
    background-color: var(--primary-color-lighter);
    transition: background-color 0.4s ease;
  }

  a {
    color: var(--primary-color);
    cursor: pointer;
    opacity: 0.7;
    text-decoration: none;
    transition: opacity 0.4s ease;

    &:hover {
      opacity: 1;
      transition: opacity 0.4s ease;
    }
  }

  > div {
    display: grid;

    &.action {
      align-items: center;
    }

    span {
      font-size: var(--font-size-3);
      color: var(--text);
      overflow: hidden;
    }
  }
`
