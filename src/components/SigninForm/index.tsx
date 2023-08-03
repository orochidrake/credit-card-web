import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import nookies, { destroyCookie, setCookie } from 'nookies'
import { Form } from '@unform/web'
import Swal from 'sweetalert2'
import * as Yup from 'yup'

import { HTTPResponse } from 'services/http/http'

import Button from 'components/Button'
import Input from 'components/Input'

import User from 'models/user'

import { Container } from './style'
import Link from 'next/link'

export default function SigninForm() {
  const router = useRouter()
  const formRef = useRef<any>(null)

  useEffect(() => {
    localStorage.clear()
    destroyCookie({}, '__token__auth__')
    Swal.close()
  }, [])

  async function handleSubmit(data: any) {
    formRef.current.setErrors({})

    try {
      const schema = Yup.object().shape({
        email: Yup.string().email().required('Campo obrigatório'),
        password: Yup.string()
          .min(8, 'Senha inválida')
          .required('Campo obrigatório')
      })

      await schema.validate(data, { abortEarly: false })

      const user = new User()
      user.email = data['email']
      user.password = data['password']

      Swal.fire({ text: 'Autenticando', showConfirmButton: false })
      Swal.showLoading()

      const resp = await user.signin()

      if (resp.status == 200) {
        const body = resp.body
        setCookie(null, '__token__auth__', body.access_token, {
          maxAge: process.env.NEXT_PUBLIC_MAX_AGE_COOKIE,
          path: '/'
        })
      }
      setTimeout(() => {
        router.push('/dashboard', undefined, {
          shallow: false
        })
        Swal.close()
      }, 1300)
    } catch (err) {
      console.log(err)
      if (err instanceof HTTPResponse) {
        if ([401, 404].includes(err.status)) {
          Swal.fire('Ops', 'Credenciais incorretas', 'error')
          return
        } else if (err.status == 429) {
          Swal.fire(
            'Atenção',
            `Tente novamente em alguns segundo ${err.message}}`,
            'error'
          )
        } else {
          Swal.fire(
            'Atenção',
            'Algo deu errado, por favor tente novamente em alguns momentos',
            'error'
          )
        }
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
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input label="E-mail" dataType="email" name="email" />
        <Input label="Senha" dataType="password" name="password" />
        <Button text="Entrar" />
      </Form>
      <Link href="/signup">
        <a>Criar conta</a>
      </Link>
    </Container>
  )
}

export async function getServerSideProps(context: any) {
  const parsedCookies = nookies.get(context)

  Object.keys(parsedCookies).forEach((k) => {
    nookies.destroy(context, k)
  })

  return {
    props: {}
  }
}
