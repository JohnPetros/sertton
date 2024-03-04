import { useDrawerStatus } from '@react-navigation/drawer'

export function useDrawerStatusMock(status: 'open' | 'closed' = 'open') {
  jest.mocked(useDrawerStatus).mockReturnValueOnce(status)
}
