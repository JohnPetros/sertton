import { waitFor } from '@testing-library/react-native'

import { useApiMock } from '@/_tests_/mocks/services/apiMock'
import { renderHook } from '@/_tests_/customs/customRenderHook'

import { useBanners } from '../hooks/useBanners'

jest.mock('@/services/api')

describe('useBanner hook', () => {
  it('should return banners from Api', async () => {
    const apiMock = useApiMock()

    const bannersMock = await apiMock.getBanners()

    const { result } = await waitFor(() => renderHook(useBanners))

    expect(result.current.banners).toEqual(bannersMock)
  })
})
