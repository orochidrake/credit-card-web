import { Container, Item } from './style'

interface ListItemProps {
  label: string
  value: any // eslint-disable-line @typescript-eslint/no-explicit-any
  color?: string
}

function ListItem({ label, value, color }: ListItemProps) {
  return (
    <>
      <Item color={color}>
        <small>{label}</small>
        <span>{value}</span>
      </Item>
    </>
  )
}

interface ListRowProps {
  _data: any // eslint-disable-line @typescript-eslint/no-explicit-any
}

export default function ListRow({ _data }: ListRowProps) {
  const templateColumns = Object.keys(_data).map(
    (k) => `${_data[k].width || 100}px`
  )

  if (_data.actions) {
    templateColumns.shift()
    _data.actions.forEach(() => {
      templateColumns.unshift(`auto`)
    })
  }

  return (
    <Container templateColumns={templateColumns.join(' ')}>
      {_data.actions &&
        _data.actions.map((act: unknown, i: number) => (
          <div key={`action-${i}`} className="action">
            {act}
          </div>
        ))}
      {Object.keys(_data)
        .filter((k) => k != 'actions')
        .map((k, i) => (
          <ListItem
            key={i}
            label={k}
            color={_data[k].color}
            value={_data[k].value}
          />
        ))}
    </Container>
  )
}
