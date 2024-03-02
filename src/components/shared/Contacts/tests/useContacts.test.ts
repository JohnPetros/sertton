import { Linking } from 'react-native'

import { useContacts } from '../useContacts'
import { renderHook } from '@/_tests_/customs/customRenderHook'

jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: jest.fn(),
}))

describe('useContacts hook', () => {
  it('calls Linking.openURL with the correct URL', async () => {
    const { result } = renderHook(useContacts)

    const testUrl = 'https://www.example.com'

    await result.current.handleContactUrl(testUrl)

    expect(Linking.openURL).toHaveBeenCalledWith(testUrl)
  })
})
