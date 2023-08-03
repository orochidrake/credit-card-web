import { MenuItem } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { Container, Item, SubItem } from './style'

interface RoleProps {
  role: string
}

interface MenuItem {
  label: string
  link?: string
  subitems?: MenuItem[]
}

export default function Sidenav({ role }: RoleProps) {
  let menuItems: MenuItem[] = []
  if (role == 'admin') {
    menuItems = [
      {
        label: 'Cartões',
        subitems: [
          {
            label: 'Listar Cartões de Crédito',
            link: '/dashboard/credit-card'
          },
          {
            label: 'Novo Cartão de Crédito',
            link: '/dashboard/credit-card/new'
          }
        ]
      },
      {
        label: 'Usuarios',
        subitems: [
          {
            label: 'Listar Usuarios',
            link: '/dashboard/user'
          },
          {
            label: 'Novo Usuario',
            link: '/dashboard/user/new'
          }
        ]
      },
      { label: 'Sair', link: '/' }
    ]
  } else {
    menuItems = [
      {
        label: 'Cartões',
        subitems: [
          {
            label: 'Novo Cartão de Crédito',
            link: '/dashboard/credit-card/new'
          }
        ]
      },

      { label: 'Sair', link: '/' }
    ]
  }

  return (
    <Container>
      <Image src="/img/logo.svg" height={60} width={200} />

      <div className="menu-items">
        {menuItems.map((mi, i) => (
          <>
            <Item key={`item-${i}`}>
              {mi.link ? (
                <Link href={mi.link}>
                  <a>{mi.label}</a>
                </Link>
              ) : (
                mi.label
              )}
            </Item>
            {mi.subitems?.map((si, j) => (
              <SubItem key={`subitem-${i}-${j}`}>
                {si.link ? (
                  <Link href={si.link}>
                    <a>{si.label}</a>
                  </Link>
                ) : (
                  si.label
                )}
              </SubItem>
            ))}
          </>
        ))}
      </div>
    </Container>
  )
}
