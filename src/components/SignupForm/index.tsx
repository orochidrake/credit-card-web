import { Form } from '@unform/web'
import Input from 'components/Input'
import Button from 'components/Button'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import User from 'models/user'
import { HTTPResponse } from 'services/http/http'
import Swal from 'sweetalert2'
import * as Yup from 'yup'
import { Container } from './style'

export default function SignupForm() {
  const router = useRouter()
  const formRef = useRef<any>(null)

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
      user.role = 'user'

      Swal.fire({ text: 'Criando novo usuario', showConfirmButton: false })
      Swal.showLoading()

      const resp = await user.signup()

      if (resp.status == 201) {
        Swal.fire({
          text: 'Criado com Sucesso',
          icon: 'success',
          showConfirmButton: false
        })

        setTimeout(() => {
          router.push('/dashboard', undefined, {
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
      <Container>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <div className="row">
            <Input label="Nome" dataType="text" name="fullname" />
            <Input label="E-mail" dataType="email" name="email" />
            <Input label="Senha" name="password" dataType="password" />

            <Button text="Cadastrar" />
          </div>
        </Form>
      </Container>
    </>
  )
}
