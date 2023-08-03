import ListRow from 'components/ListRow'
import { Container } from './style'

interface ListProps {
  _data: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
}

export default function List({ _data }: ListProps) {
  return (
    <Container>
      {_data.map((d, i) => (
        <ListRow key={i + 1} _data={d} />
      ))}
    </Container>
  )
}
