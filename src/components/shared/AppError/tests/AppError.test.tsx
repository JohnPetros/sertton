import { render } from "@/_tests_/customs/customRender"

import { AppError } from '..'
import { fireEvent, screen } from "@testing-library/react-native"

const resetErrorMock = jest.fn()

const errorMessage = 'Error message mock'
const error = new Error(errorMessage)

describe('AppError component', () => {
  it('should render title', () => {
    render(<AppError resetError={resetErrorMock} error={error} />)

    expect(screen.getByText('😢 Ops, temos um problema')).toBeTruthy()
  })

  it('should retry app', () => {
    render(<AppError resetError={resetErrorMock} error={error} />)

    const resetErrorButton = screen.getByText('Tentar novamente')

    fireEvent.press(resetErrorButton)

    expect(resetErrorMock).toHaveBeenCalled()
  })

  it('should render an anchor to ask help', () => {
    render(<AppError resetError={resetErrorMock} error={error} />)

    const anchor = screen.getByText('Pedir ajuda')

    expect(anchor).toBeTruthy()
  })
})
