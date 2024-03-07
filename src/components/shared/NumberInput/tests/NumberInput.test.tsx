import './mocks/IconsMock'

import { act, fireEvent, screen } from '@testing-library/react-native'

import { NumberInput } from '..'

import { render } from '@/_tests_/customs/customRender'
import { useNumberInputMock } from './mocks/useNumberInputMock'
import { TEST_IDS } from './constants/test-ids'

const onChangeNumberMock = jest.fn()
const onReachMaxMock = jest.fn()

jest.mock('../useNumberInput.ts')

describe('NumberInput component', () => {
  it('should render label', () => {
    const labelMock = 'label mock'
    useNumberInputMock()

    render(
      <NumberInput
        label={labelMock}
        onChangeNumber={onChangeNumberMock}
        onReachMax={onReachMaxMock}
        number={10}
      />
    )

    const inputContainer = screen.getByTestId(TEST_IDS.inputContainer)

    expect(inputContainer.props.accessibilityLabel).toBe(labelMock)
  })

  it('should have number value as value prop', () => {
    const numberValue = 10
    useNumberInputMock({ numberValue })

    render(
      <NumberInput
        label='label'
        onChangeNumber={onChangeNumberMock}
        onReachMax={onReachMaxMock}
        number={numberValue}
      />
    )

    const input = screen.getByTestId(TEST_IDS.input)

    expect(input.props.value).toBe(numberValue.toString())
  })

  it('Should decrease value', () => {
    const { handleDecreaseValueMock } = useNumberInputMock()

    render(
      <NumberInput
        label='label'
        onChangeNumber={onChangeNumberMock}
        onReachMax={onReachMaxMock}
        number={10}
      />
    )

    const button = screen.getByTestId('decrease-value-button')

    act(() => {
      fireEvent.press(button)
    })

    expect(handleDecreaseValueMock).toHaveBeenCalled()
  })

  it('Should increase value', () => {
    const { handleIncreaseValueMock } = useNumberInputMock()

    render(
      <NumberInput
        label='label'
        onChangeNumber={onChangeNumberMock}
        onReachMax={onReachMaxMock}
        number={1}
      />
    )

    const button = screen.getByTestId('increase-value-button')

    act(() => {
      fireEvent.press(button)
    })

    expect(handleIncreaseValueMock).toHaveBeenCalled()
  })
})
