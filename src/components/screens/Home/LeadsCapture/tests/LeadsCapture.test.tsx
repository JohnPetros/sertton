import { act, fireEvent, screen } from '@testing-library/react-native'

import { useLeadsCapture } from '../useLeadsCapture'
import { LeadsCapture } from '..'

import { TEST_IDS } from './constants/test-ids'

import { render } from '@/_tests_/customs/customRender'

jest.mock('../useLeadsCapture.ts')

const handleEmailChangeMock = jest.fn()
const handleSubmitMock = jest.fn()
const email = 'johnpetros@gmail.com'
const error = 'error message'

describe('LeadsCapture component', () => {
  it('should change email on change input', () => {
    jest.mocked(useLeadsCapture).mockReturnValueOnce({
      email,
      error,
      isLoading: false,
      handleEmailChange: handleEmailChangeMock,
      handleSubmit: handleSubmitMock,
    })

    render(<LeadsCapture />)

    const input = screen.getByTestId(TEST_IDS.input)

    const typedEmail = 'johnpetros'

    act(() => {
      fireEvent.changeText(input, typedEmail)
    })

    expect(handleEmailChangeMock).toHaveBeenLastCalledWith(typedEmail)
  })

  it('should render spinner when is loading', () => {
    jest.mocked(useLeadsCapture).mockReturnValueOnce({
      email,
      error,
      isLoading: true,
      handleEmailChange: handleEmailChangeMock,
      handleSubmit: handleSubmitMock,
    })

    render(<LeadsCapture />)

    const spinner = screen.getByTestId(TEST_IDS.spinner)

    expect(spinner).toBeTruthy()
  })

  it('should submit on press button', () => {
    jest.mocked(useLeadsCapture).mockReturnValueOnce({
      email,
      error,
      isLoading: false,
      handleEmailChange: handleEmailChangeMock,
      handleSubmit: handleSubmitMock,
    })

    render(<LeadsCapture />)

    const button = screen.getByTestId(TEST_IDS.button)

    act(() => {
      fireEvent.press(button)
    })

    expect(handleSubmitMock).toHaveBeenCalled()
  })
})
