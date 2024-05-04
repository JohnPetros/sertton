import { usePathname } from 'expo-router'

export function usePathnameMock() {
  jest.mocked(usePathname).mockReturnValueOnce('')
}
