import List from 'components/List'
import Sidenav from 'components/Sidenav'
import * as S from './style'
import nookies from 'nookies'
import HTTP from 'services/http/http'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import User from 'models/User'
import UserCreator from 'models/User/factory'
import { UserInterface } from 'models/User/interface'
import { useRouter } from 'next/router'

interface UserPageProps {
  _users: any[]
}

export default function UserPage({ _users }: UserPageProps) {
  const router = useRouter()
  useEffect(() => {
    const parsedCookies = nookies.get()
    const token = parsedCookies.__token__auth__
    localStorage.setItem('__token__auth__', token)
  }, [])

  const [usersArray, setUsersArray] = useState<UserInterface[]>(
    _users.map((c: unknown) => {
      const _c = UserCreator.factory(c)

      return _c
    })
  )
  const [data, setData] = useState<any[]>([])

  async function deleteItem(id: number) {
    Swal.fire({
      text: 'Deseja remover esse usuario?',
      showConfirmButton: true,
      showCancelButton: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({ text: 'Excluindo usuario', showConfirmButton: false })
        Swal.showLoading()

        const card = new User()
        const resp = await card.delete(id)

        if (resp.status == 200) {
          Swal.close()
          Swal.fire('Usuario foi excluido com sucesso', '', 'info')
          router.reload()
        }
      } else if (result.isDenied) {
        Swal.fire('Usuario não foi excluido', '', 'info')
      }
    })
  }

  useEffect(() => {
    const swap = usersArray.map((u) => {
      return {
        actions: [
          <S.DeleteButton
            key={`details-${u.id}`}
            onClick={() => deleteItem(u.id)}
          >
            Apagar
          </S.DeleteButton>,
          <S.UpdateButton
            key={`details-${u.id}`}
            onClick={() => router.push(`/dashboard/update/${u.id}`)}
          >
            Atualizar
          </S.UpdateButton>
        ],
        id: { value: u.id, width: 60 },
        Nome: { value: u.fullname, width: 400 },
        Email: { value: u.email, width: 400 },
        Tipo: { value: u.role, width: 60 }
      }
    })
    setData(swap)
  }, [])

  return (
    <>
      <div className="default-page">
        <Sidenav role={'admin'} />

        <S.Container>
          <h1>Usuarios cadastrados</h1>

          <div className="users">
            <List _data={data} />
          </div>
        </S.Container>
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
  http.createRequest('GET', `/users`)
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

  const _users = http.response.body

  return {
    props: { _users: _users }
  }
}
