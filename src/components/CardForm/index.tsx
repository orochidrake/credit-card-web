import { Form } from '@unform/web'
import Input from 'components/Input'
import Button from 'components/Button'
import { useRouter } from 'next/router'
import { useRef, useEffect } from 'react'
import CreditCard from 'models/creditCard'
import nookies from 'nookies'
import { HTTPResponse } from 'services/http/http'
import Swal from 'sweetalert2'
import * as Yup from 'yup'

export default function CardForm() {
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
        expDate: Yup.date().required('Campo obrigatório'),
        holder: Yup.string().required('Campo obrigatório'),
        number: Yup.number().required('Campo obrigatório'),
        cvv: Yup.string().min(3, 'CVV inválido').required('Campo obrigatório')
      })

      await schema.validate(data, { abortEarly: false })

      const card = new CreditCard()
      card.expDate = data['expDate']
      card.holder = data['holder']
      card.number = data['number']
      card.cvv = data['cvv']

      Swal.fire({ text: 'Cadastrando novo cartão', showConfirmButton: false })
      Swal.showLoading()

      const resp = await card.createCard()

      if (resp.status == 201) {
        Swal.fire({
          text: 'Novo cartão cadastrado com Sucesso',
          icon: 'success',
          showConfirmButton: false
        })

        setTimeout(() => {
          router.push('/dashboard/credit-card', undefined, {
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
      <div className="section">
        <Form ref={formRef} onSubmit={handleSubmit}>
          <div className="row">
            <Input label="Nome Como no cartão" dataType="text" name="holder" />
            <Input label="Numero" dataType="phone" name="number" max={16} />
            <Input label="Data de Expiração" name="expDate" dataType="month" />
            <Input label="CVV" name="cvv" dataType="phone" min={3} max={4} />

            <Button text="Cadastrar" />
          </div>
        </Form>
      </div>
    </>
  )
}
