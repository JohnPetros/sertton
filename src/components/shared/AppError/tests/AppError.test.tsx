import { render } from "@/_tests_/customs/customRender"

import { AppError } from '..'
import { fireEvent, screen } from "@testing-library/react-native"

const reTryAppMock = jest.fn()

const errorMessage = 'Error message mock'
const error = new Error(errorMessage)

describe('AppError component', () => {
  it('should render title', () => {
    render(<AppError reTryApp={reTryAppMock} error={error} />)

    expect(screen.getByText('😢 Ops, temos um problema')).toBeTruthy()
  })

  it('should retry app', () => {
    render(<AppError reTryApp={reTryAppMock} error={error} />)

    const retryAppButton = screen.getByText('Tentar novamente')

    fireEvent.press(retryAppButton)

    expect(reTryAppMock).toHaveBeenCalled()
  })

  it('should render an anchor to ask help', () => {
    render(<AppError reTryApp={reTryAppMock} error={error} />)

    const anchor = screen.getByText('Pedir ajuda')

    expect(anchor).toBeTruthy()
  })
})
