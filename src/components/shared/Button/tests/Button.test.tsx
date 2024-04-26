import { fireEvent, screen } from '@testing-library/react-native'

import { Button } from '..'

import { render } from '@/_tests_/customs/customRender'

const onPressMock = jest.fn()
const testId = 'button'

describe('Button component', () => {
  it('should call a function on press', () => {
    render(<Button testID={testId} onPress={onPressMock} />)

    const button = screen.getByTestId(testId)

    fireEvent.press(button)

    expect(onPressMock).toHaveBeenCalled()
  })
})
