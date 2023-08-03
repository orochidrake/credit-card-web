import List from 'components/List'
import Sidenav from 'components/Sidenav'
import * as S from './style'
import nookies from 'nookies'
import HTTP from 'services/http/http'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import CreditCard from 'models/creditCard'
import CreditCardCreator from 'models/creditCard/factory'
import { CreditCardInterface } from 'models/creditCard/interface'
import { useRouter } from 'next/router'

interface CreditCardPageProps {
  _cards: any[]
}

export default function CreditCardPage({ _cards }: CreditCardPageProps) {
  const router = useRouter()
  useEffect(() => {
    const parsedCookies = nookies.get()
    const token = parsedCookies.__token__auth__
    localStorage.setItem('__token__auth__', token)
  }, [])

  const [cardsArray, setCardsArray] = useState<CreditCardInterface[]>(
    _cards.map((c: unknown) => {
      const _c = CreditCardCreator.factory(c)

      return _c
    })
  )
  const [data, setData] = useState<any[]>([])

  async function deleteItem(id: number) {
    Swal.fire({
      text: 'Deseja remover esse cartão?',
      showConfirmButton: true,
      showCancelButton: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({ text: 'Excluindo cartão', showConfirmButton: false })
        Swal.showLoading()

        const card = new CreditCard()
        const resp = await card.deleteCard(id)

        if (resp.status == 200) {
          Swal.close()
          Swal.fire('Cartão foi excluido com sucesso', '', 'info')
          router.reload()
        }
      } else if (result.isDenied) {
        Swal.fire('Cartão não foi excluido', '', 'info')
      }
    })
  }

  useEffect(() => {
    const swap = cardsArray.map((c) => {
      const detailsLink = `/dashboard/credit-card/${c.id}`
      let dateTemp = c.expDate.split('-')
      let dateFormated = dateTemp[1] + '/' + dateTemp[0]
      return {
        actions: [
          <S.DeleteButton
            key={`details-${c.id}`}
            onClick={() => deleteItem(c.id)}
          >
            Apagar
          </S.DeleteButton>
        ],
        id: { value: c.id, width: 60 },
        Nome: { value: c.holder, width: 400 },
        Numero: { value: c.number, width: 400 },
        Brand: { value: c.brand, width: 80 },
        Exp: { value: dateFormated, width: 150 },
        CVV: { value: c.cvv, width: 60 }
      }
    })
    setData(swap)
  }, [])

  return (
    <>
      <div className="default-page">
        <Sidenav role={'admin'} />

        <S.Container>
          <h1>Cartões cadastrados</h1>

          <div className="cards">
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
  http.createRequest('GET', `/credit-card`)
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

  const _cards = http.response.body

  return {
    props: { _cards: _cards }
  }
}
