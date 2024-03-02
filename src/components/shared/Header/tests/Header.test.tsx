import { View } from 'react-native'
import { DrawerActions, DrawerActionType, useNavigation } from '@react-navigation/native'
import { act, fireEvent, screen } from '@testing-library/react-native'

import { Header } from '..'

import { TEST_IDS } from './constants/test-ids'

import { render } from '@/_tests_/customs/customRender'

const ListBullets = () => <View />

jest.mock('phosphor-react-native', () => ({
  ListBullets: () => {
    return <ListBullets />
  },
}))

jest.mock('@react-navigation/native')

const dispatchMock = jest.fn()
const toggleDrawerMock = jest.fn()

describe('Header component', () => {
  it('should toggle drawer on press the button', () => {
    jest.mocked(useNavigation).mockReturnValueOnce({
      dispatch: dispatchMock,
    })

    jest
      .mocked(DrawerActions)
      .toggleDrawer.mockReturnValueOnce(toggleDrawerMock as unknown as DrawerActionType)

    render(<Header />)

    const button = screen.getByTestId(TEST_IDS.button)

    act(() => {
      fireEvent.press(button)
    })

    expect(dispatchMock).toHaveBeenCalledWith(toggleDrawerMock)
  })
})
