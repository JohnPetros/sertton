import { useToast as useToastNotifications } from 'react-native-toast-notifications'
import { renderHook } from '@testing-library/react-native'

import { useToast } from '../useToast'

jest.mock('react-native-toast-notifications')

describe('useToast hook', () => {
  it('should show toast', () => {
    const message = 'toast message'
    const type = 'success'
    const duration = 3000

    const showMock = jest.fn()

    jest.mocked(useToastNotifications).mockReturnValueOnce({
      show: showMock,
      hide: jest.fn(),
      hideAll: jest.fn(),
      update: jest.fn(),
      isOpen: () => false,
    })

    const { result } = renderHook(useToast)

    result.current.show(message, type, duration)

    expect(showMock).toHaveBeenCalledWith(message, {
      type,
      placement: 'bottom',
      animationType: 'slide-in',
      duration,
    })
  })
})
