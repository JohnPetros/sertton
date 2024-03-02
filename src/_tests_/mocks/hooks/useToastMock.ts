import { useToast } from '@/utils/hooks/useToast'

const mockedUseToast = jest.mocked(useToast)

const toastMock = mockedUseToast()

type ShowMockParams = Parameters<typeof toastMock.show>

export function useToastMock() {
  const showMock = jest.fn<void, ShowMockParams>()

  mockedUseToast.mockReturnValue({
    show: showMock,
  })

  return { showMock }
}
