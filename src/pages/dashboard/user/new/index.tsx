import Sidenav from 'components/Sidenav'
import { Container } from './style'
import UserForm from 'components/UserForm'
import { useEffect, useState } from 'react'

export default function NewUserPage() {
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
          <h1>Cadastro de Usuario</h1>
          <UserForm />
        </Container>
      </div>
    </>
  )
}
