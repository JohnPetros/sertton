import { render } from '@/_tests_/customs/customRender'
import { Indentification } from '..'
import { screen } from '@testing-library/react-native'
import { injectDateProvider } from '@/services/date'
import { DayjsDateProvider } from '@/services/date/dayjs'

describe('Indentification component', () => {
  beforeAll(() => {
    injectDateProvider(DayjsDateProvider)
  })

  it('should render Sertton information', () => {
    render(<Indentification />)

    expect(
      screen.getByText('Rua Tomatssu Iawasse 233 - Vila Nova Bonsucesso'),
    ).toBeTruthy()
    expect(
      screen.getByText('© 2024 Sertton Brasil Distribuidora Ltda'),
    ).toBeTruthy()
    expect(screen.getByText('CNPJ: 33.805.461/0001-90')).toBeTruthy()
  })
})
