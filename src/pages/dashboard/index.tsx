import { useEffect, useState } from 'react'
import nookies from 'nookies'
import Swal from 'sweetalert2'
import Sidenav from 'components/Sidenav'
import { Container } from './style'
import HTTP from 'services/http/http'
import UserCreator from 'models/user/factory'
import { UserInterface } from 'models/user/interface'

interface UserProps {
  _user: any
}
export default function AdminPage({ _user }: UserProps) {
  useEffect(() => {
    localStorage.setItem('role', _user.role)
  }, [])

  const [user, setUser] = useState<UserInterface>(UserCreator.factory(_user))

  return (
    <>
      <div className="default-page">
        <Sidenav role={user.role} />

        <Container>
          <h1>Bem Vindo {user.fullname}</h1>
        </Container>
      </div>
    </>
  )
}

export async function getServerSideProps(context: any) {
  const parsedCookies = nookies.get(context)
  const token = parsedCookies.__token__auth__
  if (!token || token == 'null') {
    return {
      props: {},
      redirect: { destination: '/' }
    }
  }

  const http = new HTTP()
  http.createRequest('GET', `/user`)
  http.setAuthorization(`Bearer ${token}`)
  const requestOk = await http.sendRequest()
  if (!requestOk) {
    console.log(requestOk)
    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    }
  }

  const _user = http.response.body
  return {
    props: { _user }
  }
}
