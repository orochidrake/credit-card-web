import Sidenav from 'components/Sidenav'
import { Container } from './style'
import CardForm from 'components/CardForm'
import { useEffect, useState } from 'react'

export default function NewCardPage() {
  const [role, setRole] = useState('')

  useEffect(() => {
    const r = localStorage.getItem('role')
    setRole(r ? r : 'user')
  }, [])
  return (
    <>
      <div className="default-page">
        <Sidenav role={role} />
        <Container>
          <h1>Cadastro de Cartão</h1>
          <CardForm />
        </Container>
      </div>
    </>
  )
}
