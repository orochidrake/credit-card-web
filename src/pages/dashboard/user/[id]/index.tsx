import Sidenav from 'components/Sidenav'
import { Container } from './style'
import nookies from 'nookies'
import { useEffect, useRef, useState } from 'react'
import { Form } from '@unform/web'
import Button from 'components/Button'
import Input from 'components/Input'
import Select from 'components/Select'
import User from 'models/user'
import { useRouter } from 'next/router'
import HTTP, { HTTPResponse } from 'services/http/http'
import Swal from 'sweetalert2'
import * as Yup from 'yup'

interface UserProps {
  _user: any
}
export default function UpdateUserPage({ _user }: UserProps) {
  const [role, setRole] = useState('')

  useEffect(() => {
    const r = localStorage.getItem('role')
    setRole(r ? r : 'user')
  }, [])

  const router = useRouter()
  const formRef = useRef<any>(null)

  useEffect(() => {
    const parsedCookies = nookies.get()
    const token = parsedCookies.__token__auth__
    localStorage.setItem('__token__auth__', token)
    formRef.current.setData(_user)
  }, [])

  async function handleSubmit(data: any) {
    formRef.current.setErrors({})

    try {
      const schema = Yup.object().shape({
        email: Yup.string().email().required('Campo obrigatório')
      })

      await schema.validate(data, { abortEarly: false })

      const user = new User()
      user.fullname = data['fullname']
      user.email = data['email']
      user.password = data['password']
      user.role = data['role']

      Swal.fire({ text: 'Atualizando usuario', showConfirmButton: false })
      Swal.showLoading()

      const resp = await user.update(_user.id)

      if (resp.status == 200) {
        Swal.fire({
          text: 'Usuario Atualizado com Sucesso',
          icon: 'success',
          showConfirmButton: false
        })

        setTimeout(() => {
          router.push('/dashboard/user', undefined, {
            shallow: false
          })
          Swal.close()
        }, 1300)
      }
    } catch (err) {
      console.log(err)
      if (err instanceof HTTPResponse) {
        Swal.fire(
          'Atenção',
          'Algo deu errado, por favor tente novamente em alguns momentos',
          'error'
        )
        return
      }

      const validationErrors = {}
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          const { path, message } = error
          if (typeof path == 'string') {
            Object.defineProperty(validationErrors, path, { value: message })
          }
        })
        formRef.current.setErrors(validationErrors)
      }
    }
  }

  return (
    <>
      <div className="default-page">
        <Sidenav role={role} />
        <Container>
          <h1>Atualização de Usuario</h1>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <div className="row">
              <Input label="Nome" dataType="text" name="fullname" />
              <Input label="E-mail" dataType="email" name="email" />
              <Input label="Password" dataType="password" name="password" />
              <Select
                label="Tipo"
                name="role"
                options={[
                  { value: 'admin', label: 'admin' },
                  { value: 'user', label: 'user' }
                ]}
              />
              <Button text="Atualizar" />
            </div>
          </Form>
        </Container>
      </div>
    </>
  )
}

export async function getServerSideProps(context: any) {
  const parsedCookies = nookies.get(context)
  const token = parsedCookies.__token__auth__
  const { id } = context.query

  if (!token || token == 'null') {
    return {
      props: {},
      redirect: { destination: '/' }
    }
  }

  const http = new HTTP()
  http.createRequest('GET', `/user/${id}`)
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
