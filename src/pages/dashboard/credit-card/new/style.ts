import styled from 'styled-components'

export const Container = styled.div`
  padding: 1.5rem;
  margin-left: 10vw;

  h1 {
    margin: 0 0 1rem 0;
    font-size: var(--font-size-1);
    color: var(--primary-color);
  }
`

export const TabHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(5, auto) 1fr;
  grid-column-gap: 30px;

  color: var(--primary-color);
`

interface TabHeaderItemProps {
  selected?: boolean
}
export const TabHeaderItem = styled.h2<TabHeaderItemProps>`
  cursor: pointer;
  opacity: ${(props) => (props.selected ? '1' : '.7')};
  transition: all 0.4s ease;
  border-bottom: ${(props) =>
    props.selected ? '2px solid var(--primary-color)' : 'none'};

  &:hover {
    opacity: 1;
    transition: all 0.4s ease;
  }
`

export const TabContainer = styled.div``
