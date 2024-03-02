import { renderHook } from '@testing-library/react-native'
import { useRouter } from 'expo-router'

import { useSplash } from '../useSplash'

jest.mock('expo-router')
jest.useFakeTimers()

const homeScreenRoute = '/(stack)/(drawer)/(tabs)/home'

describe('useSplash hook', () => {
  it('should redirect user to home screen after 2 seconds', () => {
    const pushMock = jest.fn()

    jest.mocked(useRouter).mockReturnValueOnce({
      push: pushMock,
    } as unknown as ReturnType<typeof useRouter>)

    renderHook(useSplash)

    expect(pushMock).not.toHaveBeenCalled()

    jest.advanceTimersByTime(2000)

    expect(pushMock).toHaveBeenCalledWith(homeScreenRoute)
  })
})
