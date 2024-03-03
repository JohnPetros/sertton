import { act, fireEvent, screen } from '@testing-library/react-native'
import { View } from 'tamagui'

import { useCheckbox } from '../useCheckbox'
import { Checkbox } from '..'

import { render } from '@/_tests_/customs/customRender'

const labelMock = 'label mock'
const valueMock = 'checkboxValueMock'

const onChangeMock = jest.fn()
const handleCheckedChangeMock = jest.fn()
const handleLabelPressMock = jest.fn()

const Check = () => <View />

jest.mock('phosphor-react-native', () => ({
  Check: () => {
    return <Check />
  },
}))

jest.mock('../useCheckbox.ts')

describe('Checkbox component', () => {
  it('should render label', () => {
    jest.mocked(useCheckbox).mockReturnValueOnce({
      isChecked: true,
      handleLabelPress: handleLabelPressMock,
      handleCheckedChange: handleCheckedChangeMock,
    })

    render(
      <Checkbox
        label={labelMock}
        onChange={onChangeMock}
        defaultChecked={true}
        value={valueMock}
      />
    )

    expect(screen.getByText(labelMock)).toBeTruthy()
  })

  it('should have check value', () => {
    const defaultCheck = true

    jest.mocked(useCheckbox).mockReturnValueOnce({
      isChecked: true,
      handleLabelPress: handleLabelPressMock,
      handleCheckedChange: handleCheckedChangeMock,
    })

    render(
      <Checkbox
        label={labelMock}
        onChange={onChangeMock}
        defaultChecked={defaultCheck}
        value={valueMock}
      />
    )

    const checkbox = screen.getByTestId('checkbox')

    expect(checkbox.props.accessibilityState.checked).toBe(defaultCheck)
  })

  it('should change check', () => {
    jest.mocked(useCheckbox).mockReturnValueOnce({
      isChecked: true,
      handleLabelPress: handleLabelPressMock,
      handleCheckedChange: handleCheckedChangeMock,
    })

    render(
      <Checkbox
        label={labelMock}
        onChange={onChangeMock}
        defaultChecked={true}
        value={valueMock}
      />
    )

    const checkbox = screen.getByTestId('checkbox')

    act(() => {
      fireEvent.press(checkbox)
    })

    expect(handleCheckedChangeMock).toHaveBeenCalled()
  })
})
