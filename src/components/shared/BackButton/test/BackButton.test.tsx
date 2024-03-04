import { View } from 'react-native'
import { fireEvent, screen } from '@testing-library/react-native'

import { BackButton } from '..'

import { useRouterMock } from '@/_tests_/mocks/libs/expo/useRouterMock'
import { render } from '@/_tests_/customs/customRender'

const ArrowLeft = () => <View />

jest.mock('phosphor-react-native', () => ({
  ArrowLeft: () => {
    return <ArrowLeft />
  },
}))

jest.mock('expo-router')

describe('BackButton component', () => {
  it('should redirect user to home screen', () => {
    const { pushMock } = useRouterMock()

    render(<BackButton />)

    const button = screen.getByText(/voltar/i)

    fireEvent.press(button)

    expect(pushMock).toHaveBeenCalledWith('/(stack)/(drawer)/(tabs)/home')
  })
})
