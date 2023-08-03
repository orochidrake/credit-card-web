import styled from 'styled-components'

export const Container = styled.div`
  padding: 1.5rem;
  margin-left: 10vw;

  h1 {
    margin: 0 0 1rem 0;
    font-size: var(--font-size-1);
    color: var(--primary-color);
  }

  .users {
    border: 1px solid var(--primary-color);
    border-radius: 4px;
    height: 80vh;
    overflow-y: scroll;
  }
`

export const DeleteButton = styled.button`
  background-color: var(--danger-color);
  color: #fff;
  padding: 1rem;
  border-radius: 0.5rem;
  border: none;
  transition: cubic-bezier(0.075, 0.82, 0.165, 1);
  &:hover {
    transition: cubic-bezier(0.075, 0.82, 0.165, 1);
    background-color: var(--danger-color-lighter);
    color: #000;
  }
`
export const UpdateButton = styled.button`
  background-color: var(--blue);
  color: #fff;
  padding: 1rem;
  border-radius: 0.5rem;
  border: none;
  transition: cubic-bezier(0.075, 0.82, 0.165, 1);
  &:hover {
    transition: cubic-bezier(0.075, 0.82, 0.165, 1);
    background-color: #fff;
    color: var(--blue);
  }
`
