import { useNavigation } from '@react-navigation/native'

const dispatchMock = jest.fn()

export function useNavigationMock() {
  jest.mocked(useNavigation).mockReturnValueOnce({
    dispatch: dispatchMock,
  })

  return {
    dispatchMock,
  }
}
