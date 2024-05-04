import { Router, useRouter } from 'expo-router'

const pushMock = jest.fn()
const backMock = jest.fn()
const canGoBackMock = jest.fn()

export function useRouterMock() {
  jest.mocked(useRouter).mockReturnValueOnce({
    push: pushMock,
    back: backMock,
    canGoBack: canGoBackMock,
  } as unknown as Router)

  return {
    pushMock,
    backMock,
    canGoBackMock,
  }
}
