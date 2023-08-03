import { Form } from '@unform/web'
import Input from 'components/Input'
import Select from 'components/Select'
import Button from 'components/Button'
import { useRouter } from 'next/router'
import { useRef, useEffect } from 'react'
import User from 'models/user'
import nookies from 'nookies'
import { HTTPResponse } from 'services/http/http'
import Swal from 'sweetalert2'
import * as Yup from 'yup'

export default function UserForm() {
  const router = useRouter()
  const formRef = useRef<any>(null)

  useEffect(() => {
    const parsedCookies = nookies.get()
    const token = parsedCookies.__token__auth__
    localStorage.setItem('__token__auth__', token)
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
      user.fullname = data['fullname']
      user.email = data['email']
      user.password = data['password']
      user.role = data['role']

      Swal.fire({ text: 'Criando novo usuario', showConfirmButton: false })
      Swal.showLoading()

      const resp = await user.create()

      if (resp.status == 201) {
        Swal.fire({
          text: 'Novo Usuario Criado com Sucesso',
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
      <Form ref={formRef} onSubmit={handleSubmit}>
        <div className="row">
          <Input label="Nome" dataType="text" name="fullname" />
          <Input label="E-mail" dataType="email" name="email" />
          <Input label="Senha" name="password" dataType="password" />
          <Select
            label="Tipo"
            name="role"
            options={[
              { value: 'admin', label: 'admin' },
              { value: 'user', label: 'user' }
            ]}
          />
          <Button text="Cadastrar" />
        </div>
      </Form>
    </>
  )
}
